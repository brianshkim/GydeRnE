from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .course_users import courseusers
from .publications_users import publicationusers
from .folders_users import folderusers


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(255), nullable=False)
    professor = db.Column(db.Boolean)
    lastname = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10))
    school_name = db.Column(db.String(255))
    gpa = db.Column(db.String(255))
    degree_timeline = db.Column(db.String(255))
    company = db.Column(db.String(255))
    role_title=db.Column(db.String(255))
    start_date=db.Column(db.BigInteger)
    end_Date=db.Column(db.Integer)
    present_role = db.Column(db.Boolean)
    bio = db.Column(db.String(200))

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
            'email': self.email
        }

    vitae = db.relationship('Education', back_populates="users")
    accomplishments = db.relationship("Accomplishments", back_populates="users")
    course_users = db.relationship("Courses", secondary=courseusers, back_populates="users", cascade="all, delete")
    publication_users = db.relationship("Publications", secondary=publicationusers, back_populates="users", cascade="all, delete")
    journals = db.relationship("Journals", back_populates="users")
    posts = db.relationship("Post", back_populates="posts")
    folders = db.relationship("Folders", secondary=folderusers, back_populates="foldersusers", cascade="all, delete")
