from .db import db

class Publications(db.Model):
     __tablename__ = 'publications'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title=db.Column(db.String(600), nullable=False)
     content = db.Column(db.LongText, nullable=False)
