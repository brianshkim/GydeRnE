from .db import db


class Solution(db.Model):
     __tablename__ = 'solutions'
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     content = db.Column(db.Text)
     submission = db.Column(db.String)
     problem_id = db.Column(db.Integer, db.ForeignKey('problems.id'))
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


     problems = db.relationship("Problem", back_populates="solutions")
     users = db.relationship('User', back_populates='solutions')

     def to_dict(self):
        user =self.users.to_dict()
        return {
            'id': self.id,
            'content': self.content,
            'user': {'id':user['id'],'name': f'{user["firstname"]} {user["lastname"]}', 'username':user['username']}

        }
