from bson.objectid import ObjectId

class User:
    def __init__(self, db):
        self.collection = db['users']

    def create(self, username, password, email):
        user = {
            'username': username,
            'password': password,  # Deberías usar hash (bcrypt)
            'email': email,
            'balance': 1000.0  # Saldo inicial
        }
        return self.collection.insert_one(user)

    def find_by_username(self, username):
        return self.collection.find_one({'username': username})

    def find_by_id(self, user_id):
        return self.collection.find_one({'_id': ObjectId(user_id)})

    def find_all(self, search_term=None):
        if search_term:
            return self.collection.find({
                '$or': [
                    {'username': {'$regex': search_term, '$options': 'i'}},
                    {'email': {'$regex': search_term, '$options': 'i'}}
                ]
            })
        return self.collection.find()