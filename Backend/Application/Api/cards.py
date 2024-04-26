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

class CardAPI(Resource):
    # GET /api/card/<username>
        @marshal_with(card)
        def get(self, id=None, username=None):
            if username:
                card = Card.query.filter_by(username=username).first()
                if card:
                    return card.to_dict()
                else:
                    raise NotFoundError(404, 'Income not found')
            if id is not None:  # Change this condition to check if id is not None
                card = Card.query.filter_by(id=id).first()
                if card:
                    return card.to_dict()
                else:
                    raise NotFoundError(404, 'Income not found')
            else:
                cards = Card.query.all()
                return [card.to_dict() for card in cards]
        
        def post(self):
            data = request.get_json()
            if not data:
                raise CustomError('Missing JSON payload')
        
            # Check if required fields are present in the request
            required_fields = [ 'username','cardnumber', 'cardtype', 'cvv', 'expirymonth', 'expiryyear','balance']
            for field in required_fields:
                if field not in data:
                    raise CustomError(f'Missing {field} field in the request')
                
            if len(str(data['cardnumber'])) != 16:
                raise MissingParameterError(400, "Card number must be Exactly 16 Digits")
            if len(str(data['cvv'])) != 3:
                raise MissingParameterError(400, "CVV must be Exactly 3 Digits")

            card = Card(
                username=data['username'],
                cardnumber=data['cardnumber'],
                cardtype=data['cardtype'],
                cvv=data['cvv'],
                expirymonth=data['expirymonth'],
                expiryyear=data['expiryyear'],
                balance=data['balance']
            )
            db.session.add(card)
            db.session.commit()
            return card.to_dict(), 201  # 201 status code for resource created
        

        def put(self, username):
            data = request.get_json()
            if not data:
                raise CustomError('Missing JSON payload')
    
            card = Card.query.filter_by(username=username).first()
            if not card:
                return {'message': 'Profile not found'}, 404
    
            # Update the fields provided in the request
            for field, value in data.items():
                if hasattr(card, field):
                    setattr(card, field, value)
    
            db.session.commit()
            return card.to_dict(), 200

        # DELETE /api/profile/<username>
        def delete(self, username):
            card = Card.query.get(id)
            if not card:
                return {'message': 'card  not found'}, 404

            db.session.delete(card)
            db.session.commit()
        

api.add_resource(CardAPI, '/api/cards/<username>', '/api/cards/<int:id>','/api/cards')