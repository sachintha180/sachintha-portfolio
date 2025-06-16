import logging
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from api.data import data_bp
from api.models import models_bp
from utils import validate_env_variables

# Load environment variables
load_dotenv(".env.local")

# Initialize app
app = Flask(__name__)

# Register all blueprints
app.register_blueprint(data_bp)
app.register_blueprint(models_bp)

# Load and validate environment variables
env_vars = validate_env_variables(
    "FLASK_SECRET_KEY", "FLASK_SESSION_TYPE", "FLASK_PORT"
)

# Enable CORS for all routes
CORS(app, supports_credentials=True)

# Configure app parameters
app.config["SECRET_KEY"] = env_vars["FLASK_SECRET_KEY"]
app.config["SESSION_TYPE"] = env_vars["FLASK_SESSION_TYPE"]

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)

# Run Flask application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(env_vars["FLASK_PORT"]), debug=False)
