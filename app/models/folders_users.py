from .db import db

folderusers = db.Table(
    'folderusers',
     db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('folder_id', db.Integer, db.ForeignKey('folders.id'))
    )
