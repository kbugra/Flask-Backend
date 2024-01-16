# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from .models import User
from flask_login import current_user

class RegisterForm(FlaskForm):
    username=StringField("Username",validators=[DataRequired(),Length(min=2,max=20)],render_kw={"placeholder": "Username"})
    password=PasswordField("Password",validators=[DataRequired(),Length(min=2,max=20)],render_kw={"placeholder": "Password"})
    Email=StringField("Email",validators=[DataRequired(),Email()],render_kw={"placeholder": "Email"})
    
    submit=SubmitField("Sign Up")
    
    def validate_username(self,username):
        user=User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError("Username already exists")
        
    def validate_email(self,Email):
        user=User.query.filter_by(Email=Email.data).first()
        if user:
            raise ValidationError("Email already exists")
        
class LoginForm(FlaskForm):
    username=StringField("Username",validators=[DataRequired(),Length(min=2,max=20)],render_kw={"placeholder": "Username"})
    password=PasswordField("Password",validators=[DataRequired(),Length(min=2,max=20)],render_kw={"placeholder": "Password"})
    submit=SubmitField("Login")
    
    def validate_username(self,username):
        user=User.query.filter_by(username=username.data).first()
        if not user:
            raise ValidationError("Username does not exist")
        
class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=80)], render_kw={"placeholder": "Name"})
    email = StringField('Email', validators=[DataRequired(), Email()], render_kw={"placeholder": "Email"})
    subject = StringField('Subject', validators=[DataRequired(), Length(min=2, max=200)], render_kw={"placeholder": "Subject"})
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=2, max=500)], render_kw={"placeholder": "Message"})
    submit = SubmitField('Submit')

class AppointmentForm(FlaskForm):
    guardian_name = StringField('Guardian Name', validators=[DataRequired(), Length(min=2, max=80)], render_kw={"placeholder": "Guardian Name"})
    guardian_email = StringField('Guardian Email', validators=[DataRequired(), Email()], render_kw={"placeholder": "Guardian Email"})
    child_name = StringField('Child Name', validators=[DataRequired(), Length(min=2, max=80)], render_kw={"placeholder": "Child Name"})
    child_age = IntegerField('Child Age', validators=[DataRequired()], render_kw={"placeholder": "Child Age"})
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=2, max=500)], render_kw={"placeholder": "Message"})
    submit = SubmitField('Submit')
        
class ChangePasswordForm(FlaskForm):
    current_password = PasswordField('Current Password', validators=[DataRequired()])
    new_password = PasswordField('New Password', validators=[DataRequired(), Length(min=2, max=20)])
    confirm_password = PasswordField('Confirm New Password', validators=[DataRequired(), EqualTo('new_password')])
    submit = SubmitField('Change Password')

class UpdateForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    Email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Update')

    def validate_username(self, username):
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, Email):
        if Email.data != current_user.Email:
            user = User.query.filter_by(Email=Email.data).first()
            if user:
                raise ValidationError('That email is taken. Please choose a different one.')
            
