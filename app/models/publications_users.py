from .db import db

publicationusers = db.Table(
     "publicationusers",
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('publication_id', db.Integer, db.ForeignKey('publications.id'))
    )
