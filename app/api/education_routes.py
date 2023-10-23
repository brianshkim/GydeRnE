from flask import Blueprint, jsonify, request
from flask_login import mixins, current_user, login_user, logout_user, login_required
from app.models import Education, db

education_routes = Blueprint('education', __name__)

@education_routes.route('/<int:userid>')
@login_required
def user_education(userid):

    education = Education.query.filter_by(user_id=userid)
    return education[0].to_dict()


@education_routes.route('/<int:educationid>', methods=['delete'])
@login_required
def delete_education(educationid):
    education = education.query.get(educationid)
    education.delete()
    db.session.commit()
    return jsonify(id)




@education_routes.route('/', methods=['post'])
@login_required
def create_education():
    req = request.get_json()
    print(req)
    education = Education(

        degree_undergrad=req['degree_undergrad'],
        university_undergrad =req['university_undergrad'],
        degree_masters = req['degree_masters'],
        university_masters = req['university_masters'],
        degree_postdoc = req['degree_postdoc'],
        university_postdoc = req['university_postdoc'],
        doctoral_advisor = req['doctoral_advisor'],
        subject = req['subject'],
        date =req['date'],
        thesis = req['thesis'],
        user_id=current_user.id,

    )
    db.session.add(education)
    db.session.commit()
    return education.to_dict()


@education_routes.route('/<int:educationid>', methods=['post'])
@login_required
def edit_education(educationid):
    req = request.get_json()

    education = Education.query.get(educationid)
    education.degree_undergrad=req['degree_undergrad']
    education.university_undergrad = req['university_undergrad']
    education.degree_masters=req['degree_masters']
    education.university_masters = req['university_masters']
    education.degree_postdoc = req['degree_postdoc']
    education.university_postdoc = req['university_postdoc']
    education.doctoral_advisor = req['doctoral_advisor']
    education.subject = req['subject']
    education.date =req['date']
    education.thesis = req['thesis']
    db.session.commit()
    return education.to_dict()
