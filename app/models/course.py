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
     assignments = db.relationship("Assignment", back_populates="courses", cascade='all,delete')
     chapters = db.relationship('Chapter', back_populates='courses')
     def get_students(self):
        return [user.to_dict() for user in self.users]

     def get_posts(self):
         return [post.to_dict() for post in self.posts]

     def get_assignments(self):
         return [assignment.to_dict() for assignment in self.assignments]

     def get_chapters(self):
         return [chapter.to_dict() for chapter in self.chapters]


     def to_dict(self):
        return {
            'id': self.id,
            'professor': self.professor.to_dict(),
            'title': self.title,
            'subject': self.subject,
            'announcements': self.announcements,
            'syllabus': self.syllabus,
            'notes': self.get_posts(),
            'students': self.get_students(),
            'assignments':self.get_assignments(),
            'chapters': self.get_chapters(),
            'posts': self.get_posts(),


        }
