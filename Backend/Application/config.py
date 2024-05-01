from flask_sqlalchemy import SQLAlchemy

class Config:
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = None



class LocalDevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///Predictify.sqlite3'

    SECRET_KEY =  'bagga is the secret key'
    SECURITY_REGISTERABLE = True
    SECURITY_PASSWORD_SALT = 'bagga is the salt'




db = SQLAlchemy()