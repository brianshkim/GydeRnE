from .db import db
from .folders_users import folderusers

class Folders(db.Model):
     __tablename__ = 'folders'

     id = db.Column(db.Integer, primary_key=True, nullable=False)
     url1= db.Column(db.Text)
     url2= db.Column(db.Text)
     url3= db.Column(db.Text)
     url4= db.Column(db.Text)
     url5= db.Column(db.Text)
     url6= db.Column(db.Text)
     url7= db.Column(db.Text)
     url8= db.Column(db.Text)
     url9= db.Column(db.Text)
     url10= db.Column(db.Text)
     url11= db.Column(db.Text)
     url12= db.Column(db.Text)
     url13= db.Column(db.Text)
     url14= db.Column(db.Text)
     url15= db.Column(db.Text)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


     users = db.relationship("User", back_populates="accomplishments")
     user_folders = db.relationship("User", secondary=folderusers, back_populates="folders", cascade="all, delete")
