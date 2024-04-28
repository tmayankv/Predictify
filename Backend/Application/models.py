from Application.config import db
from flask_login import UserMixin
from datetime import datetime


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
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100),nullable=False)
    message = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    complaint_number = db.Column(db.String(100), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'message': self.message,
            'image': self.image,
            'complaint_number': self.complaint_number
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
    day = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'category': self.category,
            'amount': self.amount,
            'day': self.day,
            'month': self.month,
            'year': self.year
        }

class Profile(db.Model):
    username = db.Column(db.String(80),primary_key=True, nullable=False)
    phone = db.Column(db.Integer)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80))
    bio = db.Column(db.String(100))
    dob = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80))
    image = db.Column(db.String(80))

    def to_dict(self):
        return {
            'username': self.username,
            'phone': self.phone,
            'email': self.email,
            'password':self.password,
            'name': self.name,
            'bio': self.bio,
            'dob': self.dob,
            'gender': self.gender,
            'image': self.image
        }
class Card(db.Model):
    __tablename__ = 'cards'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    cardnumber = db.Column(db.Integer, nullable=False, unique=True)
    cardtype = db.Column(db.String, nullable=False)
    cvv = db.Column(db.Integer, nullable=False)
    expirymonth = db.Column(db.Integer, nullable=False)
    expiryyear = db.Column(db.Integer, nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    transactions = db.relationship('Transaction', backref='card', cascade='all, delete', lazy=True)
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'cardnumber': self.cardnumber,
            'cardtype': self.cardtype,
            'cvv': self.cvv,
            'expirymonth': self.expirymonth,
            'expiryyear': self.expiryyear,
            'balance': self.balance
        }

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id', ondelete='cascade'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)  # 'credit' or 'debit'
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.card_id,
            'amount': self.amount,
            'transaction_type': self.transaction_type,
            'timestamp': self.timestamp
        }
