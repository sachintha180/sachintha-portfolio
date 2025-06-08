from flask import Blueprint

data_bp = Blueprint("data", __name__, url_prefix="/api/data")

from . import routes
