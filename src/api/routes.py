"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Temporary in-memory store until Application model exists
FAKE_APPLICATIONS = []
NEXT_ID = 1


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# -----------------------------------------------------
# Applications API (temporary in-memory implementation)
# -----------------------------------------------------
# GET  /api/applications
# POST /api/applications
# Body:
# {
#   "company": "Google",
#   "role": "SWE",
#   "status": "Applied"
# }
@api.route('/applications', methods=['GET'])
def get_applications():
    return jsonify({"data": FAKE_APPLICATIONS}), 200


@api.route('/applications', methods=['POST'])
def create_application():
    global NEXT_ID
    data = request.get_json() or {}

    company = data.get("company")
    role = data.get("role")
    status = data.get("status", "Interested")

    if not company or not role:
        return jsonify({"error": "company and role are required"}), 400

    new_app = {
        "id": NEXT_ID,
        "company": company,
        "role": role,
        "status": status
    }
    NEXT_ID += 1
    FAKE_APPLICATIONS.append(new_app)

    return jsonify({"data": new_app}), 201


@api.route('/applications/<int:app_id>', methods=['GET'])
def get_application(app_id):
    app = next((a for a in FAKE_APPLICATIONS if a["id"] == app_id), None)
    if app is None:
        return jsonify({"error": "application not found"}), 404

    return jsonify({"data": app}), 200


@api.route('/applications/<int:app_id>', methods=['PUT'])
def update_application(app_id):
    data = request.get_json() or {}
    app = next((a for a in FAKE_APPLICATIONS if a["id"] == app_id), None)
    if app is None:
        return jsonify({"error": "application not found"}), 404

    # Update only provided fields
    for field in ["company", "role", "status"]:
        if field in data and data[field] is not None:
            app[field] = data[field]

    return jsonify({"data": app}), 200


@api.route('/applications/<int:app_id>', methods=['DELETE'])
def delete_application(app_id):
    global FAKE_APPLICATIONS
    before = len(FAKE_APPLICATIONS)
    FAKE_APPLICATIONS = [a for a in FAKE_APPLICATIONS if a["id"] != app_id]

    if len(FAKE_APPLICATIONS) == before:
        return jsonify({"error": "application not found"}), 404

    return jsonify({"data": {"deleted": True, "id": app_id}}), 200
