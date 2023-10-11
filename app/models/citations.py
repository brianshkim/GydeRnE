from .db import db

class Citations(db.Model):
     __tablename__ = 'citations'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     publication_id = db.Column(db.Integer)
     content = db.Column(db.LongText)
