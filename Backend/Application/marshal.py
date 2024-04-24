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
    "date": fields.String
}

contactforms = {
    "name": fields.String,
    "email": fields.String,
    "message": fields.String
}

retirement_fields={
    "name": fields.String,
    "category": fields.String,
    "risk": fields.String,
    "discription": fields.String,
    "performances": fields.String,
    "expertrating": fields.Float
}
    
