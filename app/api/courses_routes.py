from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Course, db, course_users, Chapter

courses_routes = Blueprint('courses', __name__)

@courses_routes.route('/')
def courses():
    courses = Course.query.filter_by(user_id=current_user.id)
    return [course.to_dict() for course in courses]


@courses_routes.route('/', methods=['post'])
@login_required
def create_courses():
    req = request.get_json()
    courses = Course(
        user_id=current_user.id,
        professor_id = req['professor_id'],
        title=req['title'],
        content=req['content'],

    )
    db.session.add(courses)
    db.session.commit()
    return courses.to_dict()


@courses_routes.route('/<int:courseid>')
def single_course(courseid):
    course = Course.query.get(courseid)
    return course.to_dict()



@courses_routes.route('/<int:courseid>', methods=['post'])
@login_required
def edit_courses(courseid):
    req = request.get_json()

    courses = Course.query.get(courseid)
    courses.title=req['title']
    courses.place=req['content']
    db.session.commit()
    return courses.to_dict()

@courses_routes.route('/<int:courseid>', methods=['delete'])
@login_required
def delete_courses(courseid):
    courses = Course.query.get(courseid)
    Course.delete()
    db.session.commit()
    return jsonify(id)


@courses_routes.route('/<int:courseid>/join', methods=['post'])
@login_required
def join_courses(courseid):
    req = request.get_json(courseid)

    course = Course.query.get(courseid)

    ins = course_users.insert().values(user_id=current_user.id, course_id=courseid)
    conn = db.engine.connect()
    conn.execute(ins)


@courses_routes.route('/<int:courseid>/chapters', methods=['post'])
@login_required
def create_chapters(courseid):
    req = request.get_json(courseid)

    chapter = Chapter(
        title=req['title'],
        course_id=req['course_id']

    )

    db.session.add(chapter)
    db.session.commit()
    return chapter.to_dict()

@courses_routes.route('/<int:courseid>/announcements', methods=['post'])
@login_required
def create_announcements(courseid):
    req = request.get_json(courseid)
    course = Course.query.get(courseid)
    db.session.add(course)
    db.session.commit()
    return course.to_dict()
