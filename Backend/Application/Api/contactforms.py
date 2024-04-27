from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
# from flask_security import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib
import uuid


from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db





class contactAPI(Resource):
    @marshal_with(contactforms)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        message = data.get('message')
        image = data.get('image')

        if not username:
            raise MissingParameterError(400, "name is required")
        if not email:
            raise MissingParameterError(400, "email is required")
        if not message:
            raise MissingParameterError(400, "message is required")
        if not image:
            raise MissingParameterError(400, "image is required")

        # Generate a unique complaint number
        complaint_number = str(uuid.uuid4())

        # Create a new instance of ContactForm
        contactform = ContactForm()
        contactform.complaint_number = complaint_number
        contactform.username = username
        contactform.email = email
        contactform.message = message
        contactform.image = image

        # Add the contactform to the session and commit
        db.session.add(contactform)
        db.session.commit()

        # Return the complaint number along with the response
        return {'complaint_number': complaint_number}, 201
    
    # def get(self):
    #     pass


        




api.add_resource(contactAPI, '/api/contactforms')
