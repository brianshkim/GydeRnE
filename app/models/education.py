from .db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Education(db.Model):
     __tablename__ = 'education'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     degree_undergrad = db.Column(ARRAY(db.String))
     university_undergrad = db.Column(ARRAY(db.String))
     degree_masters = db.Column(ARRAY(db.String))
     university_masters = db.Column(ARRAY(db.String))
     degree_postdoc = db.Column(ARRAY(db.String))
     university_postdoc = db.Column(ARRAY(db.String))
     doctoral_advisor = db.Column(db.String(600))
     subject = db.Column(db.String(600))
     date = db.Column(db.String(255))
     thesis = db.Column(db.Text)
     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

     users = db.relationship("User", back_populates="education")


     def to_dict(self):
        return {
            'id': self.id,
            'degree': self.degree,
            'university': self.university,
            'advisor': self.advisor,
            'subject': self.subject,
            'date': self.date,
            'thesis': self.thesis,

        }
