from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Post, db, comments_replies
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)

posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/<int:id>')
def single_post(id):
    post = Post.query.get(id)
    return post.to_dict()


@posts_routes.route('/user/<int:userid>')
def user_posts(userid):
    req = request.get_json()
    posts = Post.query.filter_by(user_id=userid)
    return [post.to_dict() for post in posts]

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
        root=True,
        research=req['research'],
        research_paper=req['research_paper']


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



##comments route
@posts_routes.route('/<int:postid>/comments', methods=['post'])
@login_required
def create_comments(postid):
    req = request.get_json()



    post = Post(
        comment= True,
        root= False,
        content=  req['content'],
        user_id =req['user_id']
    )

    db.session.add(post)
    db.session.commit()
    newpost = post.to_dict()
    ins = comments_replies.insert().values(commentId=postid, replyId=newpost['id'])
    conn = db.engine.connect()
    conn.execute(ins)
    originalpost = Post.query.get(req["originalid"])
    return originalpost.to_dict()

@posts_routes.route('/<int:postid>/comments/delete', methods=['post'])
@login_required
def delete_comments(postid):
    req = request.get_json()
    post = Post.query.filter_by(id=postid)
    post.delete()
    db.session.commit()
    originalpost = Post.query.get(req['originalid'])
    return originalpost.to_dict()


@posts_routes.route('/upload', methods=['post'])
@login_required
def upload_image():
    if "pdf" not in request.files:
        return {"errors": "pdf required"}, 400

    pdf = request.files["pdf"]

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
