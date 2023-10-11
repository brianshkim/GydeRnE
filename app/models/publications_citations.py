from .db import db

publicationcitations = db.Table(
     "publicationcitations",
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('publications.id'))
    )
