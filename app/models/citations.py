from .db import db
from .publications_citations import publicationcitations


class Citations(db.Model):
     __tablename__ = 'citations'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     publication_id = db.Column(db.Integer)
     content = db.Column(db.Text)


     def to_dict(self):
        return {
            'id': self.id,
            'publication_id': self.publication_id,
            'content': self.content,

        }


     publications = db.relationship("Publications", secondary=publicationcitations, back_populates="citations", cascade="all, delete")
