from .db import db


class Post(db.Model):
     __tablename__ = 'posts'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     content = db.Column(db.Text, nullable=False )
     comment = db.Column(db.String(600), nullable=False)
     root= db.Column(db.Boolean)
     resp_id = db.Column(db.Integer)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", back_populates="posts")
