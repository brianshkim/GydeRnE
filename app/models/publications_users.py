from .db import db

publicationusers = db.Table(
     "publicationusers",
    db.Model.metadata,
    db.Column('citation_id', db.Integer, db.ForeignKey('citations.id')),
    db.Column('publication_id', db.Integer, db.ForeignKey('publications.id'))
    )
