from .db import db
from .course_users import courseusers
from sqlalchemy.dialects.postgresql import ARRAY

class Course(db.Model):
     __tablename__ = 'courses'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     professor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String(400))
     subject = db.Column(db.String(400))
     grades = db.Column(ARRAY(db.JSON))
     announcements = db.Column(ARRAY(db.JSON))
     syllabus = db.Column(ARRAY(db.JSON))



     users = db.relationship("User", secondary=courseusers, back_populates="courses", cascade="all, delete")
     professor = db.relationship("User", back_populates='courses')
     posts= db.relationship('Post', back_populates='courses')
     def get_students(self):
        return [user.to_dict() for user in self.users]

     def get_posts(self):
         return [post.to_dict() for post in self.posts]


     def to_dict(self):
        return {
            'id': self.id,
            'professor_id': self.professor_id,
            'title': self.title,
            'subject': self.subject,
            'notes': self.get_posts(),
            'students': self.get_students(),
            'posts': self.get_posts()
        }
