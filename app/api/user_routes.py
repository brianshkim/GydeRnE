from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import User, ProfileImage, db
#add models for all profile nonsense ree
from app.forms import Bio
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
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

    requested = insert(friend_requests).values(userId_id = current_user.id, userId2_id = id)

    db.session.add(friend_requests)
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

    to_delete = delete(friend_requests).where(
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

    friended = insert(friends).values(userId_id = current_user.id, userId2_id = id)

    to_delete = delete(friend_requests).where(
        (friend_requests.userId == current_user.id) & (friend_requests.userId2 == id) |
        (friend_requests.userId == id) & (friend_requests.userId2 == current_user.id)
    )

    db.session.add(friended)
    db.session.delete(to_delete)
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

    to_delete = delete(friends).where(
        (friends.userId == current_user.id) & (friends.userId2 == id) |
        (friends.userId == id) & (friends.userId2 == current_user.id)
    )

    db.session.delete(to_delete)
    db.session.commit()

    return yeet_friend.to_dict()

