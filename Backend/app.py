from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_cors import CORS

from Application.config import LocalDevelopmentConfig, db
from Application.models import * # Import your User and Admin models

app = None
api = None
base_url = 'http://127.0.0.1:5000'


def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api = Api(app)

    # Initialize CORS
    CORS(app)

    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    # Initialize Flask-JWT-Extended
    jwt = JWTManager(app)

    return app, api

app, api = create_app()

# Create tables
with app.app_context():
    from Application.models import User, Admin
    db.create_all()


from Application.models import *
from Application.Api.login import *

if __name__ == '__main__':
    app.run(debug=True)