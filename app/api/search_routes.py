from flask import Blueprint, jsonify, request
from flask_login import mixins, current_user, login_user, logout_user, login_required
from app.models import db, User, Post
from sqlalchemy import or_


search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['post'])
def search():
    req = request.get_json()
    searchparam = f"%{req['value']}%"
    if len(searchparam) > 2:
        users = User.query.filter(db.or_(User.username.ilike(searchparam), User.firstname.ilike(searchparam),User.lastname.ilike(searchparam)))
        return {"users":[user.to_dict() for user in users]}
    return {"users": []}
