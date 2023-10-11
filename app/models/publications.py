from .db import db
from .publications_users import publicationusers
from .publications_citations import publicationcitations



class Publications(db.Model):
     __tablename__ = 'publications'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     title=db.Column(db.String(600), nullable=False)
     content = db.Column(db.Text, nullable=False)


     publication_users = db.relationship("User", secondary=publicationusers, back_populates="publications", cascade="all, delete")
     citations = db.relationship("Citations", secondary=publicationcitations, back_populates="publications", cascade="all, delete")
