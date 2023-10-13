from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Courses, db

courses_routes = Blueprint('courses', __name__)

@courses_routes.route('/')
def user():
    courses = Courses.query.filter_by(user_id=id)
    return courses.to_dict()


@courses_routes.route('/<int:courseid>', methods=['delete'])
@login_required
def delete_courses(courseid):
    courses = Courses.query.get(id=courseid)
    Courses.delete()
    db.session.commit()
    return jsonify(id)




@courses_routes.route('/<int:courseid>', methods=['post'])
@login_required
def create_courses(courseid):
    req = request.get_json()
    courses = Courses(
        user_id=current_user.id,
        title=req['title'],
        content=req['content'],

    )
    db.session.add(Courses)
    db.session.commit()
    return courses.to_dict()


@courses_routes.route('/<int:courseid>', methods=['post'])
@login_required
def edit_courses(courseid):
    req = request.get_json()

    courses = Courses.query.get(courseid)
    Courses.title=req['title']
    Courses.place=req['content']
    db.session.commit()
    return courses.to_dict()
