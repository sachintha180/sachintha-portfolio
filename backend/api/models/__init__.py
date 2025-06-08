from flask import Blueprint

models_bp = Blueprint("models", __name__, url_prefix="/api/models")

from . import routes
