from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Journal, db

journals_routes = Blueprint('journals', __name__)

@journals_routes.route('/')
def user():
    journal = Journal.query.filter_by(user_id=id)
    return journal.to_dict()


@journals_routes.route('/<int:journalid>', methods=['delete'])
@login_required
def delete_journals(journalid):
    journal = Journal.query.filter_by(id=journalid)
    journal.delete()
    db.session.commit()
    return jsonify(id)




@journals_routes.route('/', methods=['post'])
@login_required
def create_journals(journalid):
    req = request.get_json()
    journal = Journal(
        user_id=current_user.id,
        title=req['title'],
        content=req['content'],

    )
    db.session.add(journal)
    db.session.commit()
    return journal.to_dict()


@journals_routes.route('/<int:journalid>', methods=['post'])
@login_required
def edit_journals(journalid):
    req = request.get_json()

    journal = Journal.query.get(journalid)
    journal.title=req['title']
    journal.place=req['content']
    db.session.commit()
    return journal.to_dict()
