import logging
import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from api.data import data_bp
from api.models import models_bp

# Initialize app and register all blueprints
app = Flask(__name__)
app.register_blueprint(data_bp)
app.register_blueprint(models_bp)

# Enable CORS for all routes
CORS(app, supports_credentials=True)

# Load environment variables file
load_dotenv(".env.local")

# Configure app parameters
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
app.config["SESSION_TYPE"] = os.getenv("FLASK_SESSION_TYPE")

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)


# Initialize base route
@app.route("/", methods=["GET"])
def index():
    return "Model Dashboard Flask API"


if __name__ == "__main__":
    app.run(debug=True)
