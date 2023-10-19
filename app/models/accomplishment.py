from .db import db
from sqlalchemy.dialects.postgresql import ARRAY
class Accomplishment(db.Model):
     __tablename__ = 'accomplishments'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     firstname = db.Column(db.String(600))
     lastname = db.Column(db.String(600))
     highest_degree = db.Column(db.String(255))
     publications = db.Column(ARRAY(db.String))
     user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
     awards = db.Column(ARRAY(db.String))

     users = db.relationship("User", back_populates="accomplishments")
