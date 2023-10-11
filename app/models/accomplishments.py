from .db import db

class Accomplishments(db.Model):
     __tablename__ = 'accomplishments'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     date = db.Column(db.String(255))
     title = db.Column(db.String(255))
     place = db.Column(db.String(255))
     user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
