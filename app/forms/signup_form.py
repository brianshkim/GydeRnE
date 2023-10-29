from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if not email_validation(email):
        raise ValidationError("Not a Valid Email")

def email_validation(email):
    a=0
    y=len(email)
    dot=email.find(".")
    at=email.find("@")
    for i in range (0,at):
        if((email[i]>='a' and email[i]<='z') or (email[i]>='A' and email[i]<='Z')):
            a=a+1
    if(a>0 and at>0 and (dot-at)>0 and (dot+1)<y and email[-3:]=="edu"):
        return True
    else:
        return False


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    professor = StringField('professor', validators=[DataRequired()])
    school_name = StringField('school_name', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
