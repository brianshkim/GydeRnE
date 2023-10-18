from .db import db

publicationcitations = db.Table(
     "publicationcitations",
    db.Model.metadata,
    db.Column('publication_id', db.Integer, db.ForeignKey('publications.id')),
    db.Column('citation_id', db.Integer, db.ForeignKey('citations.id'))
    )
