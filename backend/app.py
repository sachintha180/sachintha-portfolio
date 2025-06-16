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

# Determine the environment and load the appropriate .env file
env_file = ".env.local" if os.getenv("FLASK_ENV") != "production" else ".env.production"
load_dotenv(env_file)

# Configure app parameters
secret_key = os.getenv("FLASK_SECRET_KEY")
session_type = os.getenv("FLASK_SESSION_TYPE")
flask_port = os.getenv("FLASK_PORT")

if not secret_key or not session_type or not flask_port:
    raise RuntimeError(
        "Missing required environment variables: FLASK_SECRET_KEY, FLASK_SESSION_TYPE and FLASK_PORT"
    )

app.config["SECRET_KEY"] = secret_key
app.config["SESSION_TYPE"] = session_type

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(flask_port), debug=False)
