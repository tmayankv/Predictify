from flask import request, session, redirect, url_for, render_template, flash, jsonify
from flask_restful import Resource, Api, reqparse
from flask_restful import marshal_with
# from flask_security import login_required, current_user, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
import hashlib
from flask import send_file
import io
from flask_cors import CORS

from Application.models import *
from Application.marshal import *
from Application.exception import *
from app import app, api, db

CORS(app, orgins=['https://localhost:5173'])

@app.route("/api/cards/<username>", methods=["GET"])
@app.route("/api/cards/<int:id>", methods=["GET"])
def get_card(id=None, username=None):
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

@app.route("/api/cards", methods=["POST"])
def post_card():
    data = request.get_json()
    if not data:
        raise CustomError('Missing JSON payload')

    # Check if required fields are present in the request
    required_fields = ['username', 'cardnumber', 'cardtype', 'cvv', 'expirymonth', 'expiryyear', 'balance']
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

@app.route("/api/cards/<username>", methods=["PUT"])
def put_card(id):
    data = request.get_json()
    if not data:
        raise CustomError('Missing JSON payload')

    card = Card.query.get(id)
    if not card:
        return {'message': 'Profile not found'}, 404

    # Update the fields provided in the request
    for field, value in data.items():
        if hasattr(card, field):
            setattr(card, field, value)

    db.session.commit()
    return card.to_dict(), 200

@app.route("/api/cards/<int:id>", methods=["DELETE"])
def delete_card(id):
    card = Card.query.get(id)
    if not card:
        return {'message': 'Card not found'}, 404
    db.session.delete(card)
    db.session.commit()
    return {'message': 'Card deleted'}, 200

@app.route("/api/cards/<int:id>/credit", methods=["PUT"])
def credit_card_balance(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        raise CustomError('Missing or invalid JSON payload')

    amount = data['amount']
    if not isinstance(amount, int) or amount <= 0:
        raise CustomError('Invalid amount for credit operation')

    card = Card.query.get(id)
    if not card:
        raise NotFoundError(404, 'Card not found')

    card.balance += amount
    transaction = Transaction(
        card_id=id,
        amount=amount,
        transaction_type='credit'
    )
    db.session.add(transaction)
    db.session.commit()
    return card.to_dict(), 200

@app.route("/api/cards/<int:id>/debit", methods=["PUT"])
def debit_card_balance(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        raise CustomError('Missing or invalid JSON payload')

    amount = data['amount']
    if not isinstance(amount, int) or amount <= 0:
        raise CustomError('Invalid amount for debit operation')

    card = Card.query.get(id)
    if not card:
        raise NotFoundError(404, 'Card not found')

    if card.balance < amount:
        raise CustomError('Insufficient balance')

    card.balance -= amount
    transaction = Transaction(
        card_id=id,
        amount=amount,
        transaction_type='debit'
    )
    db.session.add(transaction)
    db.session.commit()
    return card.to_dict(), 200

@app.route("/api/cards/<username>/transactions", methods=["GET"])
def get_card_transactions_by_username(username):
    card = Card.query.filter_by(username=username).first()
    if not card:
        raise NotFoundError(404, 'Card not found')

    transactions = Transaction.query.filter_by(card_id=card.id).order_by(Transaction.timestamp.desc()).all()
    if not transactions:
        return {'message': 'No transactions found for this card'}, 404

    transaction_history = []
    for transaction in transactions:
        transaction_info = {
            'timestamp': transaction.timestamp,
            'amount': transaction.amount,
            'transaction_type': transaction.transaction_type
        }
        transaction_history.append(transaction_info)

    card_info = {
        'card_number': card.cardnumber,
        'balance': card.balance,
        'transaction_history': transaction_history
    }

    return jsonify(card_info), 200

