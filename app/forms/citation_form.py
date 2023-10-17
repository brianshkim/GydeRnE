from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CitationForm(FlaskForm):
   citation = StringField(
        "citation",
        validators=[DataRequired(), Length(1, 6000, message="Message cannot be more than 6000 characters.")])
