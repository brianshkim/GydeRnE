from .db import db
from .publications_users import publicationusers
from .publications_citations import publicationcitations



class Publication(db.Model):
     __tablename__ = 'publications'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title=db.Column(db.String(600), nullable=False)
     content = db.Column(db.Text, nullable=False)


     users = db.relationship("User", secondary=publicationusers, back_populates="publications", cascade="all, delete")
     citations = db.relationship("Citation", secondary=publicationcitations, back_populates="publications", cascade="all, delete")


     def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content
        }
     def get_authors(self):
          return [user.to_dict() for user in self.users]
