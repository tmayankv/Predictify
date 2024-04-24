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


class RetirementAPI(Resource):
    @marshal_with(retirement_fields)
    def get(self, risk=None):
        if risk:
            retirement = Retirement.query.get(risk==risk)
            if retirement:
                return retirement.to_dict()
            else:
                raise NotFoundError(404, 'Retirement not found')
        else:
            retirements = Retirement.query.all()
            return [retirement.to_dict() for retirement in retirements]
        



        
api.add_resource(RetirementAPI,'/api/retirement/<string:risk>','/api/retirement')