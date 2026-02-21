"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# Import for JWT and password hashing
import jwt
import datetime
import os
import re
import bcrypt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Secret key for JWT (should be in environment variable in production)
JWT_SECRET = os.getenv('JWT_SECRET', 'super-secret-key')
JWT_ALGORITHM = 'HS256'

# Password complexity regex: min 8 chars, at least one symbol
PASSWORD_REGEX = re.compile(r'^(?=.*[!@#$%^&*()_+\-=[\]{};': "\\|,.<>/?]).{8,}$')


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# JWT Login endpoint
# Receives email and password, returns JWT token if valid
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"msg": "Missing email or password"}), 400

    email = data['email']
    password = data['password']

    # Find user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User does not exist"}), 404

    # Check password complexity
    if not PASSWORD_REGEX.match(password):
        return jsonify({"msg": "Password must be at least 8 characters and contain a symbol."}), 400

    # Check hashed password
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"msg": "Invalid password"}), 401

    # Create JWT token
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return jsonify({"token": token, "user": user.serialize()}), 200
