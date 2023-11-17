from .db import db
from .user import User
from .comments import comments_replies
from sqlalchemy.dialects.postgresql import ARRAY


class Post(db.Model):
     __tablename__ = 'posts'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title = db.Column(db.String())
     abstract = db.Column(db.String())
     content = db.Column(db.Text, nullable=False )
     comment = db.Column(db.Boolean)
     research = db.Column(db.Boolean)
     research_paper=db.Column(db.String)
     root= db.Column(db.Boolean)
     resp_id = db.Column(db.Integer)
     created_at = db.Column(db.BigInteger)
     updated_at = db.Column(db.BigInteger)
     course_id=db.Column(db.Integer, db.ForeignKey('courses.id'))
     images = db.Column(ARRAY(db.String))
     chapter_id = db.Column(db.Integer, db.ForeignKey('chapters.id'))



     users = db.relationship("User", back_populates="posts")
     comments = db.relationship('Post',
        secondary = comments_replies,
        primaryjoin = (comments_replies.c.commentId == id),
        secondaryjoin = (comments_replies.c.replyId == id),
        backref = db.backref('commentsreplies', lazy = 'dynamic', cascade="all"),
        passive_deletes=True,
        lazy = 'dynamic')
     courses=db.relationship("Course", back_populates="posts")
     chapters=db.relationship("Chapter", back_populates='posts', cascade='delete,all')
     likes = db.relationship('Like', back_populates="posts")



     def to_dict(self):
        user = self.users.to_dict()
        return {
            'id': self.id,
            'title': self.title,
            'poster': self.user_id,
            'poster_details': {"username": user['username'],"firstname": user['firstname'],
                               "lastname": user['lastname'], "profile_image": user['profile_image'],
                               "id":user['id']},
            'content': self.content,
            'abstract': self.abstract,
            'comment': self.comment,
            'root': self.root,
            'research': self.research,
            'research_paper': self.research_paper,
            'created_at' :self.created_at,
            'updated_at':self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments],
            'images': self.images

        }
