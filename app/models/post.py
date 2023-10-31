from .db import db
from .user import User
from sqlalchemy.dialects.postgresql import ARRAY


class Post(db.Model):
     __tablename__ = 'posts'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String())
     content = db.Column(db.Text, nullable=False )
     comment = db.Column(db.String(600))
     research = db.Column(db.Boolean)
     research_paper=db.Column(db.String)
     tex = db.Column(ARRAY(db.String))
     root= db.Column(db.Boolean)
     resp_id = db.Column(db.Integer)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", back_populates="posts")

     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'poster': self.user_id,
            'poster details': self.users.to_dict(),
            'content': self.content,
            'comment': self.comment,
            'root': self.root,
            'research': self.research,
            'research_paper': self.research_paper,
            'tex' :self.tex,
            'created_at' :self.created_at,
            'updated_at':self.updated_at
        }
