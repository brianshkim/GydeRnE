from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Course, db, course_users, Chapter, Announcement, Syllabus
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)


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
        course_id=courseid

    )

    db.session.add(chapter)
    db.session.commit()
    return chapter.to_dict()

@courses_routes.route('/<int:courseid>/announcements', methods=['post'])
@login_required
def create_announcements(courseid):
    req = request.get_json(courseid)

    announcement = Announcement(
        title=req['title'],
        content=req['content'],
        course_id=courseid,
        created_at=req['created_at']

    )

    db.session.add(announcement)
    db.session.commit()
    return announcement.to_dict()


@courses_routes.route('/<int:courseid>/syllabus', methods=['post'])
@login_required
def create_syllabus(courseid):
    req = request.get_json()

    syllabus = Syllabus(
        htmlcontent = req['htmlcontent'],
        submission = req['submission'],
        course_id = courseid

    )

    db.session.add(syllabus)
    db.session.commit()
    return syllabus.to_dict()



@courses_routes.route('/uploadpdf', methods=['post'])
@login_required
def upload_pdf():

    if "pdf" not in request.files:
        return {"errors": "pdf required"}, 400

    pdf = request.files["pdf"]
    print(pdf.filename)
    if(pdf.filename):
        pdf.filename = f'{pdf.filename}.pdf'


    if not allowed_file(pdf.filename):
        return {"errors": "file type not permitted"}, 400

    pdf.filename = get_unique_filename(pdf.filename)

    upload = upload_file_to_s3(pdf)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    return {"url": url}


@courses_routes.route('/uploadimages', methods=['POST'])
@login_required
def upload_image():

    if "image" not in request.files:

        return {"errors": "Image Required."}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):

        return {"errors": "Could not upload - file type must be JPG or PNG."}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request

    return {"url":url}
