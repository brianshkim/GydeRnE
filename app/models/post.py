from .db import db
from .user import User
from sqlalchemy.dialects.postgresql import ARRAY


class Post(db.Model):
     __tablename__ = 'posts'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     content = db.Column(db.Text, nullable=False )
     comment = db.Column(db.String(600), nullable=False)
     research = db.Column(db.Boolean)
     research_paper=db.Column(db.String)
     root= db.Column(db.Boolean)
     resp_id = db.Column(db.Integer)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", back_populates="posts")

     def to_dict(self):
        return {
            'id': self.id,
            'poster': self.user_id,
            'content': self.content,
            'comment': self.comment,
            'root': self.root,
            'self.research': self.research,
            'responder details': [user.to_dict() for user in self.users.to_dict()],
            'created_at' :self.created_at,
            'updated_at':self.updated_at
        }
