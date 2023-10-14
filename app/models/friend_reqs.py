from .db import db

import datetime

class FriendReq(db.Model):
    __tablename__ = 'friend_requests'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    userId2 = db.Column(db.Integer)
    request = db.Column(db.Boolean, default=False)
    requestTime = db.Column(db.DateTime)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'userId2': self.userId2,
            'request': self.request,
            'requestTime': self.requestTime,
            'createdAt': self.createdAt
        }
