from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Publications, db, publications_users

publications_routes = Blueprint('publications', __name__)

@publications_routes.route('/')
def user():
    publications = publications.query.filter_by(user_id=id)
    return publications.to_dict()


@publications_routes.route('/<int:publicationid>', methods=['delete'])
@login_required
def delete_publications(publicationid):
    publication = Publications.query.get(publicationid)
    publication.delete()
    db.session.commit()
    return jsonify(publicationid)




@publications_routes.route('/<int:publicationid>', methods=['post'])
@login_required
def create_publications(publicationid):
    req = request.get_json()
    newpublication = Publications(
        user_id=current_user.id,
        title=req['title'],
        content=req['content']

    )
    db.session.add(newpublication)
    db.session.commit()
    newpublicationlist = newpublication.to_dict()
    ins = publications_users.insert().values(userId=current_user.id, publication_id=newpublicationlist['id'])
    conn = db.engine.connect()
    conn.execute(ins)
    return {"newpublication":newpublication.to_dict()}


@publications_routes.route('/<int:publicationid>', methods=['post'])
@login_required
def edit_publication(publicationid):
    req = request.get_json()

    publication = Publications.query.get(id=publicationid)
    for key in req:
        publication.key = req['key']
    db.session.commit()
    return publication.to_dict()
