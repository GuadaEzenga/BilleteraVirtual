from flask import Blueprint, request, jsonify
from models.user import User
from pymongo import MongoClient
from config import Config
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)
client = MongoClient(Config.MONGO_URI)
db = client['billetera']  # Cambia a 'billetera'
user_model = User(db)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = user_model.find_by_username(username)
    if user and user['password'] == password:  # Comparación directa de contraseñas
        token = jwt.encode({
            'user_id': str(user['_id']),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, Config.SECRET_KEY)
        return jsonify({'token': token})
    return jsonify({'message': 'Credenciales inválidas'}), 401

@auth_bp.route('/usuarios', methods=['GET'])
def get_users():
    search_term = request.args.get('search', '')
    users = user_model.find_all(search_term)
    return jsonify([{
        'id': str(user['_id']),
        'name': user['username'],
        'email': user['email']
    } for user in users])