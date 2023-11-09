from .db import db
from .course_users import courseusers

class Course(db.Model):
     __tablename__ = 'courses'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     professor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String(400))
     subject = db.Column(db.String(400))
     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

     def to_dict(self):
        return {
            'id': self.id,
            'professor_id': self.professor_id,
            'title': self.title,
            'subject': self.subject,
            'notes': self.get_posts(),
            'students': self.get_students()
        }

     users = db.relationship("User", secondary=courseusers, back_populates="courses", cascade="all, delete")
     posts= db.relationship('Post', back_populates='courses')
     def get_students(self):
        return [user.to_dict() for user in self.users]

     def get_posts(self):
         return [post.to_dict() for post in self.posts]
