BilleteraVirtual
Una billetera virtual kawaii con frontend en React y backend en Flask con MongoDB.
Instalación
Frontend

Navega a la carpeta client:cd client


Instala las dependencias:npm install


Inicia el servidor de desarrollo:npm start



Backend

Navega a la carpeta server:cd server


Crea un entorno virtual e instala las dependencias:python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt


Configura MongoDB y actualiza MONGO_URI en server/config.py.
Inicia el servidor Flask:python app.py



Uso

Asegúrate de que MongoDB esté corriendo.
Inicia el backend (python app.py) y el frontend (npm start).
Accede a http://localhost:3000 para usar la aplicación.

