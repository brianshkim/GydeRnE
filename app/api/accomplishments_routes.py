from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Accomplishment, db

accomplishments_routes = Blueprint('accomplishments', __name__)

@accomplishments_routes.route('/')
def user(id):
    accomplishments = Accomplishment.query.filter_by(user_id=current_user.id)
    return accomplishments.to_dict()


@accomplishments_routes.route('/<int:accomplishmentid>', methods=['delete'])
@login_required
def delete_accomplishments(accomplishmentid):
    accomplishments = Accomplishment.query.get(accomplishmentid)
    accomplishments.delete()
    db.session.commit()
    return jsonify(id)




@accomplishments_routes.route('/<int:accomplishmentid>', methods=['post'])
@login_required
def create_accomplishments(id):
    req = request.get_json()
    accomplishments = Accomplishment(
        user_id=current_user.id,
        title=req['title'],
        place=req['place'],

    )
    db.session.add(accomplishments)
    db.session.commit()
    return accomplishments.to_dict()


@accomplishments_routes.route('/<int:accomplishmentid>', methods=['post'])
@login_required
def edit_accomplishments(accomplishmentid):
    req = request.get_json()

    accomplishments = Accomplishment.query.filter_by(id=accomplishmentid)
    accomplishments.title=req['title']
    accomplishments.place=req['place']
    accomplishments.date=req['date']
    db.session.commit()
    return accomplishments.to_dict()
