from .db import db

class Accomplishments(db.Model):
     __tablename__ = 'accomplishments'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     date = db.Column(db.String(255))
     title = db.Column(db.String(600))
     place = db.Column(db.String(255))
     user_id = db.Column(db.Integer,db.ForeignKey('users.id'))

     users = db.relationship("User", back_populates="accomplishments")
