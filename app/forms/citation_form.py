from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CitationForm(FlaskForm):
    message = StringField(
        "citation",
        validators=[DataRequired(), Length(1, 200, message="Citation cannot exceed 200 characters.")])
