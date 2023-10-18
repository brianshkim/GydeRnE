from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Publication, db, publications_users, Citation
from app.forms import CitationForm

publications_routes = Blueprint('publications', __name__)

def errors_list(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@publications_routes.route('/')
def user():
    publications = Publication.query.filter_by(user_id=id)
    return Publication.to_dict()


@publications_routes.route('/<int:publicationid>', methods=['delete'])
@login_required
def delete_publications(publicationid):
    publication = Publication.query.get(publicationid)
    publication.delete()
    db.session.commit()
    return jsonify(publicationid)




@publications_routes.route('/<int:publicationid>', methods=['post'])
@login_required
def create_publications(publicationid):
    req = request.get_json()
    newpublication = Publication(
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
def edit_citations(publicationid):
    req = request.get_json()

    publication = Publication.query.get(id=publicationid)
    publication.title = req['title']
    publication.content = req['content']
    db.session.commit()
    return publication.to_dict()


@publications_routes.route("/<int:publicationid>/citations")
@login_required
def get_citations(publicationid):
    all_citations = Citation.query.filter(publication_id = publicationid)
    return {
        "citations":[citation.to_dict() for citation in all_citations]
    }

@publications_routes.route("/<int:publicationid>/citations", methods=["POST"])
@login_required
def new_message():
    form = CitationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newCitation = form.data["citation"]
        data = request.json
        add_citation = Citation(
            publication_id= data['publication_id'],
            content = newCitation,

            )
        db.session.add(add_citation)
        db.session.commit()
        return{
            "message": add_citation.to_dict()
        }
    return {'Failed'}, 401

@publications_routes.route("/<int:publicationid>/citations/<int:citationid>", methods=["PUT", "DELETE"])
@login_required
def edit_delete_citations(citationid):

    if request.method == "PUT":
        form = CitationForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            edit_citation = Citation.query.get(citationid)
            edit_citation.content = form.data["citation"]
            db.session.commit()
            return { "citation": edit_citation.to_dict() }

        return {'errors': errors_list(form.errors)}, 401

    if request.method == "DELETE":
        citation = Citation.query.get(citationid)

        db.session.delete(citation)
        db.session.commit()

        return { "citation": "Success" }
