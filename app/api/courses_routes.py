from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Course, db

courses_routes = Blueprint('courses', __name__)

@courses_routes.route('/')
def courses():
    courses = Course.query.filter_by(user_id=current_user.id)
    return [course.to_dict() for course in courses]


@courses_routes.route('/<int:courseid>', methods=['delete'])
@login_required
def delete_courses(courseid):
    courses = Course.query.get(id=courseid)
    Course.delete()
    db.session.commit()
    return jsonify(id)




@courses_routes.route('/<int:courseid>', methods=['post'])
@login_required
def create_courses(courseid):
    req = request.get_json()
    courses = Course(
        user_id=current_user.id,
        title=req['title'],
        content=req['content'],

    )
    db.session.add(courses)
    db.session.commit()
    return courses.to_dict()


@courses_routes.route('/<int:courseid>', methods=['post'])
@login_required
def edit_courses(courseid):
    req = request.get_json()

    courses = Course.query.get(courseid)
    courses.title=req['title']
    courses.place=req['content']
    db.session.commit()
    return courses.to_dict()
