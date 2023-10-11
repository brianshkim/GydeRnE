from .db import db

courseusers = db.Table(
     "courseusers"
    'VolumeRelationship', db.Base.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'))
    )
