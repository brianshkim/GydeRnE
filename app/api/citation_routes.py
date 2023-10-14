from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import User, db
from app.forms import Citation
from app.api.auth_routes import validation_errors_to_error_messages

citation_routes = Blueprint('citations', __name__)

