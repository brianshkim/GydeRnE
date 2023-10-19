from .db import db

journalscommittee = db.Table(
     "journalscommittee",
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('journal_id', db.Integer, db.ForeignKey('journals.id'))
    )
