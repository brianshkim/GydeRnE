from .db import db

class Education(db.Model):
     __tablename__ = 'education'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     degree = db.Column(db.Integer, db.ForeignKey('users.id'))
     university = db.Column(db.Integer, db.ForeignKey('users.id'))
     advisor = db.Column(db.DateTime())
     subject = db.Column(db.DateTime())
     date = db.Column(db.Text())
     thesis = db.Column(db.Text())
     user_id = db.Column(db.Integer)
