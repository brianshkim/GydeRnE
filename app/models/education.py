from .db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Education(db.Model):
     __tablename__ = 'education'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     degree_undergrad = db.Column(ARRAY(db.JSON))
     ###years_attended_undergrad = db.Column(ARRAY(db.Integer))
     university_undergrad = db.Column(ARRAY(db.String))
     degree_masters = db.Column(ARRAY(db.String))
     university_masters = db.Column(ARRAY(db.String))
     ###years_attended_masters = db.Column(ARRAY(db.Integer))
     degree_postdoc = db.Column(ARRAY(db.String))
     university_postdoc = db.Column(ARRAY(db.String))
     ###years_attended_postdoc = db.Column(ARRAY(db.Integer))
     doctoral_advisor = db.Column(db.String(600))
     subject = db.Column(db.String(600))
     date = db.Column(db.String(255))
     thesis = db.Column(db.Text)
     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

     users = db.relationship("User", back_populates="education")


     def to_dict(self):
        return {
            'id': self.id,
            'degree_undergrad': self.degree_undergrad,
            'university_undergrad ': self.university_undergrad ,
            'degree_masters': self.degree_masters,
            'degree_postdoc': self.degree_postdoc,
            'university_postdoc': self.university_postdoc,
            'doctoral_advisor': self.doctoral_advisor,
            'subject' : self.subject,
            'date': self.date,
            'thesis' : self.thesis,
            'user_id': self.user_id


        }
