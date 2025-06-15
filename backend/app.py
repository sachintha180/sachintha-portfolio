import logging
import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from api.data import data_bp
from api.models import models_bp

# Initialize app
app = Flask(__name__)

# Register all blueprints
app.register_blueprint(data_bp)
app.register_blueprint(models_bp)

# Enable CORS for all routes
CORS(app, supports_credentials=True)

# Load environment variables file
load_dotenv(".env.local")

# Configure app parameters
secret_key = os.getenv("FLASK_SECRET_KEY")
session_type = os.getenv("FLASK_SESSION_TYPE")

if not secret_key or not session_type:
    raise RuntimeError(
        "Missing required environment variables: FLASK_SECRET_KEY and FLASK_SESSION_TYPE"
    )

app.config["SECRET_KEY"] = secret_key
app.config["SESSION_TYPE"] = session_type

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("FLASK_PORT", 80)), debug=False)
