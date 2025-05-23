from bson.objectid import ObjectId
from datetime import datetime

class Transaction:
    def __init__(self, db):
        self.collection = db['transactions']
        self.users = db['users']

    def create(self, sender_id, recipient_id, amount, note):
        # Validar IDs
        if not ObjectId.is_valid(sender_id) or not ObjectId.is_valid(recipient_id):
            raise ValueError("IDs de sender o recipient inválidos")
        
        # Validar amount
        try:
            amount = float(amount)
            if amount <= 0:
                raise ValueError("El monto debe ser positivo")
        except (ValueError, TypeError):
            raise ValueError("Monto inválido")

        transaction = {
            'sender_id': ObjectId(sender_id),
            'recipient_id': ObjectId(recipient_id),
            'amount': amount,
            'note': note,
            'date': datetime.utcnow().isoformat()  # Convertir a string ISO para compatibilidad
        }

        # Actualizar saldos
        sender = self.users.find_one({'_id': ObjectId(sender_id)})
        recipient = self.users.find_one({'_id': ObjectId(recipient_id)})
        if not sender or not recipient:
            raise ValueError("Sender o recipient no encontrados")

        if sender['balance'] < amount:
            raise ValueError("Saldo insuficiente")

        self.users.update_one({'_id': ObjectId(sender_id)}, {'$inc': {'balance': -amount}})
        self.users.update_one({'_id': ObjectId(recipient_id)}, {'$inc': {'balance': amount}})
        result = self.collection.insert_one(transaction)
        return result

    def find_by_sender(self, sender_id):
        if not ObjectId.is_valid(sender_id):
            return []  # Retornar lista vacía si el ID no es válido
        return list(self.collection.find({'sender_id': ObjectId(sender_id)}))  # Convertir cursor a lista

    def find_last(self, sender_id):
        if not ObjectId.is_valid(sender_id):
            return None  # Retornar None si el ID no es válido
        return self.collection.find_one(
            {'sender_id': ObjectId(sender_id)},
            sort=[('date', -1)]
        )