from .db import db

import datetime

class ProfileImage(db.Model):
    __tablename__ = 'profileimages'

    id = db.Column(db.Integer, primary_key=True)
    imgUrl = db.Column(db.String(255), default= 'https://www.valueglide.com/hubfs/graduation-person-icon-graduation-person-avatar-free-vector.webp')
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #relationship
    user = db.relationship('User', back_populates='profileImages')


    def to_dict(self):
        return {
            'id': self.id,
            'imgUrl': self.imgUrl,
            'userId': self.userId,
        }
