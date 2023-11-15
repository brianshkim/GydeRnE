from .db import db
from .users_assignments import usersassignments
from sqlalchemy.dialects.postgresql import ARRAY

class Assignment(db.Model):
     __tablename__ = 'assignments'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     title = db.Column(db.String(1000))
     submits = db.Column(ARRAY(db.JSON))
     course = db.Column(db.Integer,db.ForeignKey("courses.id"))
     total_score=db.Column(db.Integer)
     active=db.Column(db.Boolean)


     users = db.relationship("User", secondary=usersassignments, back_populates="assignments", cascade="all, delete")
     courses = db.relationship("Course", back_populates='assignments', cascade="all,delete")
     scores = db.relationship("Score", back_populates='assignments', cascade='all,delete')
     problems = db.relationship('Problem', back_populates='assignments', cascade='all,delete')



     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'submits': self.submits,
            'total_score': self.total_score,
            'active':self.active,
            'score': [score.to_dict for score in self.scores],
            'problem': [problem.to_dict for problem in self.problems]

        }
