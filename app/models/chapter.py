from .db import db
from .users_assignments import usersassignments
from sqlalchemy.dialects.postgresql import ARRAY

class Chapter(db.Model):
     __tablename__ = 'chapters'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     title =db.Column(db.String(600))
     course_id=db.Column(db.Integer, db.ForeignKey('courses.id'))


     posts = db.relationship('Post', back_populates='chapters')
     courses = db.relationship("Course",back_populates='chapters')


     def to_dict_courses(self):
        return {
            'id': self.id,
            'title': self.content,
            'solutions': [solution.to_dict for solution in self.solutions]
        }

     def to_dict(self):
        return {
            'id': self.id,
            'title': self.content,
            'solutions': [solution.to_dict for solution in self.solutions],
            'course': self.courses.to_dict()

        }
