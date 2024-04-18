from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
from flask_uploads import UploadSet, IMAGES, configure_uploads
# from flask_security import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib


from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db


# Initialize Flask-Uploads
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)



class contactAPI(Resource):
    @marshal_with(contact_form)
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        # Check if 'screenshot' is in the request files
        if 'screenshot' in request.files:
            # Save the file
            screenshot = photos.save(request.files['screenshot'])
        else:
            screenshot = None

        if not name:
            raise MissingParameterError(400, " name is required")
        if not email:
            raise MissingParameterError(400, "email is required")
        if not message:
            raise MissingParameterError(400, "message is required")

        contactform = contactform(name=name, email=email, message=message, screenshot=screenshot)
        db.session.add(contactform)
        db.session.commit()
        return {'message': 'message sent successfully'}, 201
    
        




api.add_resource(contactAPI, '/api/contactform', '/api/contactform/')