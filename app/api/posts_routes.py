from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Post, db

posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def user():
    posts = Post.query.filter_by(user_id=id)
    return posts.to_dict()


@posts_routes.route('/<int:postid>', methods=['delete'])
@login_required
def delete_posts(postid):
    post = Post.query.get(postid)
    if (post.user_id==current_user.id):
     post.delete()
     db.session.commit()
     return jsonify(id)



@posts_routes.route('/<int:postid>', methods=['post'])
@login_required
def create_posts(postid):
    req = request.get_json()
    post = Post(
        user_id=current_user.id,
        content=req['content'],
        comment=req['comment'],
        root=req['root'],
        resp_id=req['resp_id'],
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
        post.resp_id=req['resp_id']


    db.session.commit()
    return post.to_dict()
