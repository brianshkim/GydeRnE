from .db import db


class Score(db.Model):
    __tablename__ = 'scores'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    score=db.Column(db.Float)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    users = db.relationship('User', back_populates='scores')
    assignments = db.relationship('Assignment', back_populates='scores')

    def to_dict(self):
        return {
            'id': self.id,
            'score': self.score,
            'user_id': self.user_id,
            'assignment_id': self.assignment_id

        }
