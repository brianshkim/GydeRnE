from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Coursenote, db

coursenotes_routes = Blueprint('coursesnotes', __name__)

@coursenotes_routes.route('/')
def coursenotes():
    coursenotes = Coursenote.query.filter_by(user_id=current_user.id)
    return [coursenote.to_dict() for coursenote in coursenotes]


@coursenotes_routes.route('/<int:coursenoteid>', methods=['delete'])
@login_required
def delete_courses(coursenoteid):
    coursenote = Coursenote.query.get(id=coursenoteid)
    Coursenote.delete()
    db.session.commit()
    return jsonify(id)




@coursenotes_routes.route('/', methods=['post'])
@login_required
def create_courses():
    req = request.get_json()
    coursenote = Coursenote(
        user_id=current_user.id,
        course_id=req['course_id'],
        content=req['content'],
        tex=req['tex'],
        comment=req['comment'],
        root=req['root'],
        resp_id=req['resp_id'],

    )
    db.session.add(coursenote)
    db.session.commit()
    return coursenote.to_dict()


@coursenotes_routes.route('/<int:coursenoteid>', methods=['post'])
@login_required
def edit_courses(coursenoteid):
    req = request.get_json()

    coursenote = Coursenote.query.get(coursenoteid)
    coursenote.content=req['content']
    coursenote.root=req['root']
    coursenote.comment=req['comment']
    coursenote.tex=req['tex']
    coursenote.updated_at=req['updated_at']
    db.session.commit()
    return coursenote.to_dict()
