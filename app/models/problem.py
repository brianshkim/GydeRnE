from .db import db
from .users_assignments import usersassignments
from sqlalchemy.dialects.postgresql import ARRAY

class Problem(db.Model):
     __tablename__ = 'problems'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     content = db.Column(db.Text)
     assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'))


     assignments = db.relationship("Assignment", back_populates='problems', cascade="all,delete")
     solutions = db.relationship("Solution", back_populates='problems', cascade='all,delete')


     def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'solutions': [solution.to_dict() for solution in self.solutions]

        }
