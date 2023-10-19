from .db import db
from .user import User
from .journals_authors import journalscommittee


class Journal(db.Model):
     __tablename__ = 'journals'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     title = db.Column(db.String(255))
     content = db.Column(db.Text)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", secondary=journalscommittee, back_populates="journals", cascade="all, delete")

     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_details': self.get_students()
        }


     def get_authors(self):
         user = User.query.get(self.user_id)
         return user.to_dict()
