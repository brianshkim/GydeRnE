from .db import db
from .course_users import courseusers

class Courses(db.Model):
     __tablename__ = 'courses'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     professor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String(400))
     subject = db.Column(db.String(400))

     course_users = db.relationship("User", secondary=courseusers, back_populates="courses", cascade="all, delete")
