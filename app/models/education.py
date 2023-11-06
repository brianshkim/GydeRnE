from .db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Education(db.Model):
     __tablename__ = 'education'
     id = db.Column(db.Integer, primary_key=True, nullable=False )
     undergrad = db.Column(ARRAY(db.JSON))
     masters = db.Column(ARRAY(db.JSON))
     postdoc = db.Column(ARRAY(db.JSON))
     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

     users = db.relationship("User", back_populates="education")


     def to_dict(self):
        return {
            'id': self.id,
            'undergrad': self.undergrad,
            'masters': self.masters,
            'postdoc': self.postdoc


        }
