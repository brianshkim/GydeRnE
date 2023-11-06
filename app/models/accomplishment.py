from .db import db
from sqlalchemy.dialects.postgresql import ARRAY
class Accomplishment(db.Model):
     __tablename__ = 'accomplishments'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
     bio = db.Column(db.Text())
     publications = db.Column(ARRAY(db.String))
     awards = db.Column(ARRAY(db.String))

     users = db.relationship("User", back_populates="accomplishments")

     def to_dict(self):
          return {
               "id":self.id,
               "bio" : self.bio,
               "publications": self.publications,
               "awards": self.awards,
                }
