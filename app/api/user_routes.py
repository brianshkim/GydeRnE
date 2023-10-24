from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)

from app.models import User, db, Friend, FriendReq
#add models for all profile nonsense ree
from app.forms import Bio
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')

def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/', methods=['post'])
@login_required
def edit_user():
    req = request.get_json()

    user = User.query.get(current_user.id)
    user.firstname=req['firstname']
    user.lastname=req['lastname']
    user.professor=req['professor']
    user.phone_number=req['phone_number']
    user.school_name=req['school_name']
    user.degree_timeline=req['degree_timeline']
    user.company = req['company']
    user.role_title=req['role_title']
    user.start_date=req['start_date']
    user.bio = req['bio']
    user.profile_image=req['profile_image']
    user.session.commit()
    return user.to_dict()

#getting my/user friends

@user_routes.route('/friends')
@login_required
def my_friends():
    all_friends = current_user.friends
    friends_list = [friend.to_dict() for friend in all_friends if current_user.id != friend.id]
    return friends_list

@user_routes.route('/<int:id>/friends')
@login_required
def their_friends():
    their_friends = user.friends
    friends_list = [friend.to_dict() for friend in their_friends if user.id != friend.id]
    return friends_list

#send friend request

@user_routes.route('/<int:id>/req/add', methods=['POST'])
@login_required
def req_friend():
    friend = User.query.get(id)

    ##requested = insert(friend_requests).values(userId_id = current_user.id, userId2_id = id)

    friend_request = FriendReq(
        userId=current_user.id,
        userId2_id=id,
        request=True

    )

    db.session.add(friend_request)
    db.session.commit()

    #error handling for if friend is user or friend is blocked
    if friend != current_user | friend.blocked != True:
        return friend.to_dict()
    else:
        return {'Error: something went wrong!'}, 404

#delete request

@user_routes.route('/<int:id>/req/unsend', methods=['DELETE'])
@login_required
def unsend_request():

    yeet_friend = User.query.get(id)
    current_reqs = current_user.friend_requests

    to_delete = delete(friend_requests).where(
        (friend_requests.userId == current_user.id) & (ffriend_requests.userId2 == id)
    )

    db.session.delete(to_delete)
    db.session.commit()

    return yeet_friend.to_dict()

#reject request

@user_routes.route('/<int:id>/req/reject', methods=['DELETE'])
@login_required
def reject_request():

    yeet_friend = User.query.get(id)
    current_reqs = current_user.friend_requests

    to_delete = db.delete(friend_requests).where(
        (friend_requests.userId == id) & (friend_requests.userId2 == current_user.id)
    )

    db.session.delete(to_delete)
    db.session.commit()

    return yeet_friend.to_dict()


#friend request accepted

@user_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def add_friend():
    new_friend = User.query.get(id)

    ##friended = insert(friends).values(userId_id = current_user.id, userId2_id = id)

   ### to_delete = delete(friend_requests).where(
   ###     (friend_requests.userId == current_user.id) & (friend_requests.userId2 == id) |
   ###     (friend_requests.userId == id) & (friend_requests.userId2 == current_user.id)
   ### )

    friend = Friend(
        userId = current_user.id,
        userId2 = id,
        friends = True,

    )

    friendrequest = FriendReq.query.filter(userId=current_user.id).filter(userId2=id)
    friendrequest2 = FriendReq.query.filter(userId=id).filter(userId2=current_user.id)


    db.session.add(friend)
    db.session.delete(friendrequest)
    db.session.delete(friendrequest2)
    db.session.commit()

    #error handling for if friend is user or friend is blocked
    if new_friend != current_user:
        return new_friend.to_dict()
    else:
        return {'Error: something went wrong!'}, 404

#remove friend

@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def remove_friend():

    yeet_friend = User.query.get(id)
    current_friends = current_user.friends

    ###to_delete = delete(friends).where(
    ###    (friends.userId == current_user.id) & (friends.userId2 == id) |
    ###    (friends.userId == id) & (friends.userId2 == current_user.id)
    ###)
    friend1 = Friend.query.filter(userId=current_user.id).filter(userId2=id)
    friend2 = Friend.query.filter(userId=id).filter(userId2=current_user.id)

    db.session.delete(friend1)
    db.session.delete(friend2)
    db.session.commit()

    return yeet_friend.to_dict()




@user_routes.route('/<int:id>/upload', methods=['POST'])
@login_required
def upload_image(id):
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
    user = User.query.get(id)
    user.profile_image = url
    db.session.commit()
    return {"url": url}
