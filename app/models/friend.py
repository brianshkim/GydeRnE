from .db import db

import datetime

class Friend(db.Model):
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    userId2 = db.Column(db.Integer, db.ForeignKey('users.id'))
    friends = db.Column(db.Boolean, default=False)
    blocked = db.Column(db.Boolean, default=False)
    friendTime = db.Column(db.DateTime)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)

    #friended
    user = db.relationship('User', back_populates='friendedFirst', foreign_keys=[userId])
    user2 = db.relationship('User', back_populates='friendedSecond', foreign_keys=[userId2])
    ###messages = db.relationship('Message', back_populates='friend')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'userId2': self.userId2,
            'friendTime': self.friendTime,
            'user': self.user.to_dict(),
            'user2':self.user2.to_dict()
        }
