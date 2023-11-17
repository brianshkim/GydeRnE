from .db import db
class Like(db.Model):
     __tablename__ = 'likes'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     count = db.Column(db.Integer, default=0)
     announcement_id = db.Column(db.Integer, db.ForeignKey('announcements.id'))
     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

     announcements = db.relationship("Announcement", back_populates='likes')
     posts = db.relationship("Post", back_populates='likes')
