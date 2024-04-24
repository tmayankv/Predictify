from Application.config import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    username = db.Column(db.String(100), unique=True, primary_key=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.String(255), nullable=False)


    def is_user(self):
        user = User.query.filter_by(username=self.username).first()
        if user is not None:
            return True
        else:
            return False
    
    def update_password(self, new_password):
        self.password = new_password
        db.session.commit()

    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'dob': self.dob
        }
    

class Admin(db.Model, UserMixin):
    username = db.Column(db.String(100), unique=True, primary_key=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.String(255), nullable=False)



    def is_admin(self):
        user = Admin.query.filter_by(username=self.username).first()
        if user is not None:
            return True
        else:
            return False
    
    def update_password(self, new_password):
        self.password = new_password
        db.session.commit()

    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'dob': self.dob
        }
    

class Income (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    source = db.Column(db.String(100), nullable=False)
    recurring = db.Column(db.Boolean, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'amount': self.amount,
            'source': self.source,
            'recurring': self.recurring,
            'day': self.day,
            'month': self.month,
            'year': self.year
        }
    

class ContactForm (db.Model):
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), primary_key=True)
    message = db.Column(db.String(100), nullable=False)


    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'message': self.message
        }

class Retirement (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String, nullable=False)
    risk = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    performance = db.Column(db.String(100), nullable=False)
    expertrating = db.Column(db.Float, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'risk': self.risk,
            'description': self.description,
            'performance': self.performance,
            'expertrating': self.expertrating
        }
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'category': self.category,
            'amount': self.amount
        }