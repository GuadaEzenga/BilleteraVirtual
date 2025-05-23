from flask import Blueprint, request, jsonify
from models.transaction import Transaction
from models.user import User
from pymongo import MongoClient
from config import Config
import jwt
from functools import wraps

transactions_bp = Blueprint('transactions', __name__)
client = MongoClient(Config.MONGO_URI)
db = client['billetera']
transaction_model = Transaction(db)
user_model = User(db)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token faltante'}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = user_model.find_by_id(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Usuario no encontrado'}), 401
        except:
            return jsonify({'message': 'Token inválido'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@transactions_bp.route('/transferencias', methods=['POST'])
@token_required
def create_transfer(current_user):
    data = request.get_json()
    recipient_id = data.get('recipientId')
    amount = data.get('amount')
    note = data.get('note')

    if not recipient_id or not amount or amount <= 0:
        return jsonify({'message': 'Datos inválidos'}), 400

    recipient = user_model.find_by_id(recipient_id)
    if not recipient:
        return jsonify({'message': 'Destinatario no encontrado'}), 404

    if current_user['balance'] < amount:
        return jsonify({'message': 'Saldo insuficiente'}), 400

    transaction = transaction_model.create(current_user['_id'], recipient_id, amount, note)
    return jsonify({
        'id': str(transaction.inserted_id),
        'recipient': {'id': recipient_id, 'name': recipient['username'], 'email': recipient['email']},
        'amount': amount,
        'note': note,
        'date': transaction_model.find_last(current_user['_id'])['date']
    })

@transactions_bp.route('/historial', methods=['GET'])
@token_required
def get_history(current_user):
    transactions = transaction_model.find_by_sender(current_user['_id'])  # Ahora devuelve una lista
    return jsonify([{
        'id': str(t['_id']),
        'recipient': {
            'id': str(t['recipient_id']),
            'name': user_model.find_by_id(t['recipient_id'])['username'],
            'email': user_model.find_by_id(t['recipient_id'])['email']
        },
        'amount': t['amount'],
        'note': t['note'],
        'date': t['date']  # Ya es un string ISO gracias a la corrección
    } for t in transactions])

@transactions_bp.route('/historial/last', methods=['GET'])
@token_required
def get_last_transfer(current_user):
    transaction = transaction_model.find_last(current_user['_id'])
    if not transaction:
        return jsonify({})
    recipient = user_model.find_by_id(transaction['recipient_id'])
    return jsonify({
        'id': str(transaction['_id']),
        'recipient': {'id': str(recipient['_id']), 'name': recipient['username'], 'email': recipient['email']},
        'amount': transaction['amount'],
        'note': transaction['note'],
        'date': transaction['date']
    })