from flask_sqlalchemy import SQLAlchemy

class Config:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = None



class LocalDevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///Predictify.sqlite3'

    SECRET_KEY =  'vish_30 is the secret key'
    SECURITY_REGISTERABLE = True
    SECURITY_PASSWORD_SALT = 'vish_30 is the salt'




db = SQLAlchemy()