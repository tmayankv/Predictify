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


@app.route("/api/retirement/<string:risk>", methods=["GET"])
def get_risk(risk=None):
    if risk:
        retirement = Retirement.query.get(risk==risk)
        if retirement:
            return retirement.to_dict()
        else:
            raise NotFoundError(404, 'Retirement not found')
    else:
        retirements = Retirement.query.all()
        return [retirement.to_dict() for retirement in retirements]
        
@app.route("/api/retirement", methods=["POST"])
def post_retirement():
    data = request.get_json()
    if not data:
        raise CustomError('Missing JSON payload')

    # Check if required fields are present in the request
    required_fields = [ 'name','category', 'risk', 'discription', 'performance', 'expertrating']
    for field in required_fields:
        if field not in data:
            raise CustomError(f'Missing {field} field in the request')
        

    retirement = Retirement(
        name=data['name'],
        category=data['category'],
        risk=data['risk'],
        discription=data['discription'],
        performance=data['performance'],
        expertrating=data['expertrating']
    )
    db.session.add(retirement)
    db.session.commit()
    return card.to_dict(), 201
