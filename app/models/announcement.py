from .db import db

from sqlalchemy.dialects.postgresql import ARRAY

class Announcement(db.Model):
     __tablename__ = 'announcements'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     title =db.Column(db.String(600))
     content = db.Column(db.String(1000))
     course_id=db.Column(db.Integer, db.ForeignKey('courses.id'))
     created_at=db.Column(db.BigInteger)
     modified_at=db.Column(db.BigInteger)


     courses = db.relationship("Course",back_populates='announcements')
     likes = db.relationship("Like", back_populates="announcements")

     def get_posts(self):
         return [post.to_dict() for post in self.posts]

     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content':self.content,
            'created_at':self.created_at,
            'modified_at':self.modified_at


        }
