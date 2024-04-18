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
    date = db.Column(db.String(100), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'amount': self.amount,
            'source': self.source,
            'recurring': self.recurring,
            'date': self.date
        }

