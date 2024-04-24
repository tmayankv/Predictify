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


class ExpenseAPI(Resource):
    # GET /api/exp/<username>
    @marshal_with(expense_schema)
    def get(self, username):
        expense = Expense.query.filter_by(username=username).first()
        if not expense:
            return {'message': 'Expense not found'}, 404
        return expense.to_dict(), 200

    # POST /api/exp
    def post(self):
        data = request.get_json()
        if not data:
            raise CustomError('Missing JSON payload')  # Raise custom error
        
        category = data.get('category')
        if category not in ['home', 'work', 'food', 'travel', 'entertainment', 'health', 'education', 'shopping']:
            raise CustomError('Invalid category')

        # Map the category to the corresponding string
        if category == 'home':
            category_string = 'Consider reducing utility usage or finding cheaper home maintenance services.'
        elif category == 'work':
            category_string = 'Look for ways to save on transportation costs or consider packing meals instead of eating out.'
        elif category == 'food':
            category_string = 'Plan meals ahead, avoid eating out frequently, and buy groceries in bulk to save money.'
        elif category == 'travel':
            category_string = 'Search for affordable accommodation options, use public transportation, and look for discounts on attractions.'
        elif category == 'entertainment':
            category_string = 'Opt for free or low-cost entertainment options such as outdoor activities, movie nights at home, or using streaming services instead of going to the cinema.'
        elif category == 'health':
            category_string = 'Focus on preventive care to avoid expensive medical bills, consider generic medications, and explore options for reducing gym membership costs.'
        elif category == 'education':
            category_string = 'ExpenseLook for scholarships, grants, or online courses that offer financial aid, and consider buying second-hand textbooks or renting them instead of buying new ones.'
        elif category == 'shopping':
            category_string = 'Consider paying by credit card instead of cash to avail extra discounts, compare prices before buying, and look for discounts or coupons to save on shopping expenses.'

        expense = Expense(
            username=data['username'],
            name=data['name'],
            category=category_string,
            amount=data['amount'],
        )
        db.session.add(expense)
        db.session.commit()
        # return {"result":"success"}
        return expense.to_dict(), 200

    # PUT /api/exp/<username>
    def put(self, username):
        data = request.get_json()
        if not data:
            raise CustomError('Missing JSON payload')
        expense = Expense.query.filter_by(username=username).first()
        if not expense:
            return {'message': 'Expense not found'}, 404
        for field, value in data.items():
            if hasattr(expense, field):
                setattr(expense, field, value)
        db.session.commit()
        return expense.to_dict(), 200

    # DELETE /api/exp/<username>
    def delete(self, username):
        expense = Expense.query.filter_by(username=username).first()
        if not expense:
            return {'message': 'Expense not found'}, 404
        db.session.delete(expense)
        db.session.commit()
        return '', 204  # No content
    
api.add_resource(ExpenseAPI, '/api/exp/<username>','/api/exp')