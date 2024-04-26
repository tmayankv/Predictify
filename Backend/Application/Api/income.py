from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib
import json


from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db



class IncomeAPI(Resource):
    @marshal_with(income_fields)
    def get(self, id=None, username=None):
        if username:
            income = Income.query.filter_by(username=username).first()
            if income:
                return income.to_dict()
            else:
                raise NotFoundError(404, 'Income not found')
        elif id:
            incomes = Income.query.get(id)
            if incomes:
                return [income.to_dict() for income in incomes]
            else:
                raise NotFoundError(404, 'Income not found')
        else:
            incomes = Income.query.all()
            return [income.to_dict() for income in incomes]
    
    
  
    def post(self):
        data = request.get_json()
        username = data.get('username')
        amount = data.get('amount')
        source = data.get('source')
        recurring = data.get('recurring')
        day = data.get('day')
        month = data.get('month')
        year = data.get('year')

        if not username:
            raise MissingParameterError(400, "User name is required")
        if not amount:
            raise MissingParameterError(400, "Amount is required")
        if not source:
            raise MissingParameterError(400, "Source is required")
        if not recurring:
            raise MissingParameterError(400, "Recurring is required")
        if not day:
            raise MissingParameterError(400, "Date is required")
        if not month:
            raise MissingParameterError(400, "Date is required")
        if not year:
            raise MissingParameterError(400, "Date is required")
        
        income = Income(username=username, amount=amount, source=source, recurring=recurring, day=day, month=month, year=year)
        db.session.add(income)
        db.session.commit()
        return {'message': 'Income added successfully'}, 201
    



class Date:
    def __init__(self, day, month, year):
        self.day = day
        self.month = month
        self.year = year



class GraphAPI(Resource):
    def get(self, username):
        incomes = Income.query.filter_by(username=username).all()
        final = []
        for income in incomes:
            inc_dict = {}
            inc_dict["x"] = Date(income.day, income.month, income.year).__dict__
            inc_dict["y"] = income.amount
            final.append(inc_dict)


        return jsonify(final)
            
    



api.add_resource(IncomeAPI, '/api/income', '/api/income/<string:username>')
api.add_resource(GraphAPI, '/api/graph/<string:username>')
