from .db import db
from sqlalchemy.dialects.postgresql import ARRAY

class Syllabus(db.Model):
     __tablename__ = 'syllabuses'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     htmlcontent = db.Column(db.Text)
     submission = db.Column(db.String)
     course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

     courses = db.relationship("Course", back_populates="syllabuses")

     def to_dict(self):
        return {
            'id': self.id,
            'content': self.htmlcontent,
            'submission': self.submission,
            'course_id': self.course_id

        }
