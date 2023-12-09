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
