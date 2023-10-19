from .db import db
from .publications_citations import publicationcitations


class Citation(db.Model):
     __tablename__ = 'citations'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     publication_id = db.Column(db.Integer)
     content = db.Column(db.Text)


     def to_dict(self):
        return {
            'id': self.id,
            'publication_id': self.publication_id,
            'content': self.content,

        }

     def get_publication(self):{

     }


     publications = db.relationship("Publication", secondary=publicationcitations, back_populates="citations", cascade="all, delete")
