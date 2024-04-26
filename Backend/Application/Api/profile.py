from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
# from flask_security import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib
from flask import send_file
import io



from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db


class ProfileAPI(Resource):
    # GET /api/profile/<username>
    @marshal_with(profile)
    def get(self, username):
        profile = Profile.query.filter_by(username=username).first()
        if not profile:
            return {'message': 'Profile not found'}, 404
        return profile.to_dict(), 200

    # POST /api/profile
    def post(self):
        data = request.get_json()
        if not data:
            raise CustomError('Missing JSON payload')
        
        # Check if required fields are present in the request
        required_fields = ['name', 'email', 'username','phone', 'bio', 'dob', 'gender', 'password','image']
        for field in required_fields:
            if field not in data:
                raise CustomError(f'Missing {field} field in the request')
            
        # Assuming you hash the password before storing it
        hashed_password = generate_password_hash(data['password'])

        profile = Profile(
            name=data['name'],
            email=data['email'],
            username=data['username'],
            phone=data['phone'],
            bio=data['bio'],
            dob=data['dob'],
            gender=data['gender'],
            password=hashed_password,
            image=data['image']
        )
        db.session.add(profile)
        db.session.commit()
        return profile.to_dict(), 201  # 201 status code for resource created

    # PUT /api/profile/<username>
    def put(self, username):
        data = request.get_json()
        if not data:
            raise CustomError('Missing JSON payload')

        profile = Profile.query.filter_by(username=username).first()
        if not profile:
            return {'message': 'Profile not found'}, 404

        # Update the fields provided in the request
        for field, value in data.items():
            if hasattr(profile, field):
                setattr(profile, field, value)

        db.session.commit()
        return profile.to_dict(), 200

    # DELETE /api/profile/<username>
    def delete(self, username):
        profile = Profile.query.filter_by(username=username).first()
        if not profile:
            return {'message': 'Profile not found'}, 404

        db.session.delete(profile)
        db.session.commit()
        return '', 204  # No content
    

class ImageUpload(Resource):
    def post(self):
        file = request.files['image']
        image = Image(file.filename, file.read())
        db.session.add(image)
        db.session.commit()

        return jsonify({'message': 'Image uploaded successfully.'})
    
    def get(self, image_id):
        image = Image.query.get(image_id)
        if not image:
            return jsonify({'error': 'Image not found'}), 404

        # Assuming 'image_data' is the column in your database storing the image data
        return send_file(io.BytesIO(image.data), mimetype='image/jpeg')



api.add_resource(ImageUpload, '/upload', '/image/<int:image_id>')
# Add the resource to the API
api.add_resource(ProfileAPI, '/api/profile/<username>','/api/profile')