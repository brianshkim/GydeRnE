from .db import db


class Journals(db.Model):
     __tablename__ = 'journals'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String(255))
     content = db.Column(db.Text)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     users = db.relationship("User", back_populates="journals")
