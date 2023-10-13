from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Journals, db

journals_routes = Blueprint('journals', __name__)

@journals_routes.route('/')
def user():
    journals = Journals.query.filter_by(user_id=id)
    return journals.to_dict()


@journals_routes.route('/<int:journalid>', methods=['delete'])
@login_required
def delete_journals(journalid):
    journals = journals.query.filter_by(id=journalid)
    journals.delete()
    db.session.commit()
    return jsonify(id)




@journals_routes.route('/<int:journalid>', methods=['post'])
@login_required
def create_journals(journalid):
    req = request.get_json()
    journals = Journals(
        user_id=current_user.id,
        title=req['title'],
        content=req['content'],

    )
    db.session.add(journals)
    db.session.commit()
    return journals.to_dict()


@journals_routes.route('/<int:journalid>', methods=['post'])
@login_required
def edit_journals(journalid):
    req = request.get_json()

    journals = journals.query.get(journalid)
    journals.title=req['title']
    journals.place=req['content']
    db.session.commit()
    return journals.to_dict()
