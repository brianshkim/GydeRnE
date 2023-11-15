from .db import db

usersassignments = db.Table(
    'usersassignments',
     db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('assignment_id', db.Integer, db.ForeignKey('assignments.id'))
    )
