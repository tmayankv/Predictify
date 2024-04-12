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



class IncomeAPI(Resource):
    @marshal_with(income_fields)
    def get(self, id=None):
        if id:
            income = Income.query.get(id)
            if income:
                return income.to_dict()
            else:
                raise NotFoundError(404, 'Income not found')
        else:
            incomes = Income.query.all()
            return [income.to_dict() for income in incomes]
    
    

    def post(self):
        data = request.get_json()
        username = data.get('username')
        amount = data.get('amount')
        recurring = data.get('recurring')
        date = data.get('date')

        if not username:
            raise MissingParameterError(400, "User name is required")
        if not amount:
            raise MissingParameterError(400, "Amount is required")
        if not recurring:
            raise MissingParameterError(400, "Recurring is required")
        if not date:
            raise MissingParameterError(400, "Date is required")
        
        income = Income(username=username, amount=amount, recurring=recurring, date=date)
        db.session.add(income)
        db.session.commit()
        return {'message': 'Income added successfully'}, 201
    
        




api.add_resource(IncomeAPI, '/api/income', '/api/income/<int:id>')
