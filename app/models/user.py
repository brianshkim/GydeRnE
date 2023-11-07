from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .course_users import courseusers
from .publications_users import publicationusers
from .folder import Folder
from .accomplishment import Accomplishment
from .publication import Publication
from .journals_committee import journalscommittee

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    professor = db.Column(db.Boolean, )
    phone_number = db.Column(db.String(10))
    school_name = db.Column(db.String(255))
    degree_timeline = db.Column(db.String(255))
    company = db.Column(db.String(255))
    role_title=db.Column(db.String(255))
    start_date=db.Column(db.BigInteger)
    bio = db.Column(db.String(200))
    profile_image = db.Column(db.String())




    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'firstname':self.firstname,
            'lastname': self.lastname,
            'professor': self.professor,
            'phone_number': self.phone_number,
            'school_name': self.school_name,
            'degree_timeline': self.degree_timeline,
            'company':self.company,
            'role_title':self.role_title,
            'start_date':self.start_date,
            'profile_image':self.profile_image,
            'school_name': self.school_name,

        }




    education = db.relationship('Education', back_populates="users")
    accomplishments = db.relationship("Accomplishment", back_populates="users")
    courses = db.relationship("Course", secondary=courseusers, back_populates="users", cascade="all, delete")
    coursenotes = db.relationship('Coursenote', back_populates='users')
    publications = db.relationship("Publication", secondary=publicationusers, back_populates="users", cascade="all, delete")
    journals = db.relationship("Journal", secondary=journalscommittee, back_populates="users", cascade="all, delete")
    posts = db.relationship("Post", back_populates="users", cascade='all,delete')
    folders = db.relationship("Folder", back_populates="users")
    friendedFirst = db.relationship('Friend', back_populates='user', foreign_keys='[Friend.userId]')
    friendedSecond = db.relationship('Friend', back_populates='user2', foreign_keys='[Friend.userId2]')
    friend_requests = db.relationship('FriendReq', back_populates='users')

    def get_publications(self):
        return [publication.to_dict() for publication in self.publications]

    def get_accomplishments(self):
        return [accomplishment.to_dict() for accomplishment in self.accomplishments]

    def get_folders(self):
        return [folder.to_dict() for folder in self.folders]
