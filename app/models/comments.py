from app.models import db
comments_replies = db.Table(
    "commentsreplies",
    db.Model.metadata,
    db.Column('commentId', db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE"), primary_key=True),
    db.Column('replyId', db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE"), primary_key=True)
)
