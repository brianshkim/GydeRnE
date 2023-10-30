from .db import db
from sqlalchemy.dialects.postgresql import ARRAY


class Coursenote(db.Model):
     __tablename__ = 'coursenotes'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
     content = db.Column(db.Text, nullable=False )
     tex = db.Column(ARRAY(db.String))
     comment = db.Column(db.String(600), nullable=False)
     resp_id = db.Column(db.Integer)
     created_at = db.Column(db.DateTime)
     updated_at = db.Column(db.DateTime)

     courses = db.relationship("Course", back_populates="coursenotes")
     users = db.relationship('User', back_populates='coursenotes')

     def to_dict(self):
        return {
            'id': self.id,
            'user_id' :self.user_id,

            'course': self.course_id,
            'content': self.content,
            'comment': self.comment,
            'root': self.root,
            'created_at' :self.created_at,
            'updated_at':self.updated_at
        }
