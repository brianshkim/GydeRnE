from .db import db
from .user import User


class Journals(db.Model):
     __tablename__ = 'journals'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String(255))
     content = db.Column(db.Text)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", back_populates="journals")

     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_details': self.get_students()
        }


     def get_students(self):
         user = User.query.get(self.user_id)
         return user.to_dict()
