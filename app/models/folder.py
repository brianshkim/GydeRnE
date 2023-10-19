from .db import db
from sqlalchemy.dialects.postgresql import ARRAY
class Folder(db.Model):
     __tablename__ = 'folders'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     urls = db.Column(ARRAY(db.String))
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


     users = db.relationship("User", back_populates="folders")
