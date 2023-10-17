from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Folder, db, folderusers

folders_routes = Blueprint('folders', __name__)

@folders_routes.route('/')
def get_folders():
    folders = Folder.query.filter_by(user_id=id)
    return [folder.to_dict() for folder in folders]


@folders_routes.route('/<int:folderid>', methods=['delete'])
@login_required
def delete_folders(folderid):
    folder = Folder.query.get(folderid)
    folder.delete()
    db.session.commit()
    return jsonify(folderid)




@folders_routes.route('/<int:folderid>', methods=['post'])
@login_required
def create_folders(folderid):
    req = request.get_json()
    newFolder = Folder(
        user_id=current_user.id,
        url1=req['url1'],
        url2=req['url2'],
        url3=req['url3'],
        url4=req['url4'],
        url5=req['url5'],
        url6=req['url6'],
        url7=req['url7'],
        url8=req['url8'],
        url9=req['url9'],
        url10=req['url10'],
        url11=req['url11'],
        url12=req['url12'],
        url13=req['url13'],
        url14=req['url14'],
        url15=req['url15'],

    )
    db.session.add(newFolder)
    db.session.commit()
    newfolderlist = newFolder.to_dict()
    ins = folderusers.insert().values(userId=current_user.id, folder_id=newfolderlist['id'])
    conn = db.engine.connect()
    conn.execute(ins)
    return {"newfolder":newFolder.to_dict()}


@folders_routes.route('/<int:folderid>', methods=['post'])
@login_required
def edit_folder(folderid):
    req = request.get_json()

    folder = Folder.query.get(id=folderid)
    for key in req:
        folder.key = req['key']
    db.session.commit()
    return folder.to_dict()
