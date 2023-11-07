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
        undergrad = req['undergrad'],
        masters=req['masters'],
        postdoc=req['postdoc']
    )
    db.session.add(education)
    db.session.commit()
    return education.to_dict()


@education_routes.route('/<int:educationid>', methods=['post'])
@login_required
def edit_education(educationid):
    req = request.get_json()

    education = Education.query.get(educationid)
    education.undergrad = req['undergrad']
    education.masters=req['masters']
    education.postdoc=req['postdoc']

    db.session.commit()
    return education.to_dict()
