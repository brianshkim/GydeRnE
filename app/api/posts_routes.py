from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Post, db
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)

posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def user():
    posts = Post.query.filter_by(user_id=id)
    return [post.to_dict() for post in posts.to_dict()]


@posts_routes.route('/<int:postid>', methods=['delete'])
@login_required
def delete_posts(postid):
    post = Post.query.get(postid)
    if (post.user_id==current_user.id):
     post.delete()
     db.session.commit()
     return jsonify(id)



@posts_routes.route('/', methods=['post'])
@login_required
def create_posts():
    req = request.get_json()
    post = Post(
        user_id=current_user.id,
        title=req['title'],
        content=req['content'],
        root=req['root'],
        research=req['research'],


        )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()

@posts_routes.route('/<int:postid>', methods=['post'])
@login_required
def edit_posts(postid):
    req = request.get_json()

    post = Post.query.get(postid)
    if post.user_id == current_user.id:
        post.content=req['content']
        post.root=req['root']
        post.comment=req['comment']
        post.resesarch=req['research']
        post.updated_at=req['updated_at']


    db.session.commit()
    return post.to_dict()


@posts_routes.route('/<int:postid>/upload', methods=['POST'])
@login_required
def upload_image(postid):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    post = Post.query.get(postid)
    post.research_paper = url
    db.session.commit()
