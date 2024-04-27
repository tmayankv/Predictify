from flask_restful import fields


user = {
    "username": fields.String,
    "password": fields.String,
    "email": fields.String,
    "dob": fields.String
}

admin = {
    "username": fields.String,
    "password": fields.String,
    "email": fields.String,
    "dob": fields.String
}

income_fields = {
    "username": fields.String,
    "amount": fields.String,
    "source": fields.String,
    "recurring": fields.String,
    "day": fields.Integer,
    "month": fields.Integer,
    "year": fields.Integer
}

contactforms = {
    "username": fields.String,
    "email": fields.String,
    "message": fields.String,
    "image": fields.String,
    "complaint_number": fields.String
}

retirement_fields={
    "name": fields.String,
    "category": fields.String,
    "risk": fields.String,
    "discription": fields.String,
    "performances": fields.String,
    "expertrating": fields.Float
}
expense_schema={
    "id": fields.Integer,
    "username": fields.String,
    "name": fields.String,
    "category": fields.String,
    "amount": fields.String
}

profile={
    "username": fields.String,
    "phone": fields.Integer,
    "email": fields.String,
    "password": fields.String,
    "name": fields.String,
    "bio": fields.String,
    "dob": fields.String,
    "gender": fields.String,
    "image": fields.String
}
card={
    "id": fields.Integer,
    "username": fields.String,
    "cardnumber": fields.Integer,
    "cardtype": fields.String,
    "cvv": fields.Integer,
    "expirymonth": fields.Integer,
    "expiryyear": fields.Integer,
    "balance": fields.Integer
}