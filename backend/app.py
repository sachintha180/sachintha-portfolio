import logging
import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv
from flask_cors import CORS
from flask_session import Session
from api.data import data_bp
from api.models import models_bp
from typing import cast

# Initialize app with static files (from React)
app = Flask(__name__, static_folder="../frontend/dist")

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
        "Missing required environment variables: FLASK_SECRET_KEY and/or FLASK_SESSION_TYPE"
    )

app.config["SECRET_KEY"] = secret_key
app.config["SESSION_TYPE"] = session_type

# Initialize session for app
Session(app)

# Configure basic logging
logging.basicConfig(level=logging.INFO)


# Serve React static files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path: str):
    static_folder = cast(str, app.static_folder)
    full_path = os.path.join(static_folder, path)
    if path != "" and os.path.exists(full_path) and not os.path.isdir(full_path):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, "index.html")


if __name__ == "__main__":
    # In production, use a WSGI server like gunicorn or waitress
    app.run(host="0.0.0.0", port=int(os.getenv("FLASK_PORT", 80)), debug=False)
