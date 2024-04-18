from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
# from flask_security import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib


from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db





class contactAPI(Resource):
    @marshal_with(contactforms)
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name:
            raise MissingParameterError(400, " name is required")
        if not email:
            raise MissingParameterError(400, "email is required")
        if not message:
            raise MissingParameterError(400, "message is required")

        contactform = contactforms(name=name, email=email, message=message)
        db.session.add(contactform)
        db.session.commit()
        return {'message': 'message sent successfully'}, 201
    
        




api.add_resource(contactAPI, '/api/contactforms')
