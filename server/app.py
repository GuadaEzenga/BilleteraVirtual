from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth import auth_bp
from routes.transactions import transactions_bp
from config import Config
from pymongo import MongoClient

app = Flask(__name__)
app.config.from_object(Config)

# Configurar MongoDB
client = MongoClient(app.config['MONGO_URI'])
db = client['billeteravirtual']

# Habilitar CORS
CORS(app)

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(transactions_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)