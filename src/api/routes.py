"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Application
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import date

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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
    applications = Application.query.all()
    return jsonify({"data": [app.serialize() for app in applications]}), 200


@api.route('/applications', methods=['POST'])
def create_application():
    data = request.get_json() or {}
    applied_date_str = data.get("applied_date")
    applied_date_value = date.fromisoformat(
        applied_date_str) if applied_date_str else None

    new_application = Application(
        company=data.get("company"),
        role=data.get("role"),
        location=data.get("location"),
        applied_date=applied_date_value,
        status=data.get("status", "Applied"),
        notes=data.get("notes"),
        employment_type=data.get("employment_type")
    )

    db.session.add(new_application)
    db.session.commit()

    return jsonify({"data": new_application.serialize()}), 201


@api.route('/applications/<int:app_id>', methods=['GET'])
def get_application(app_id):
    app = Application.query.get(app_id)

    if app is None:
        return jsonify({"error": "application not found"}), 404

    return jsonify({"data": app.serialize()}), 200


@api.route('/applications/<int:app_id>', methods=['PUT'])
def update_application(app_id):
    data = request.get_json() or {}

    app = Application.query.get(app_id)

    if app is None:
        return jsonify({"error": "application not found"}), 404

    if "company" in data:
        app.company = data["company"]

    if "role" in data:
        app.role = data["role"]

    if "location" in data:
        app.location = data["location"]

    if "status" in data:
        app.status = data["status"]

    if "notes" in data:
        app.notes = data["notes"]

    if "employment_type" in data:
        app.employment_type = data["employment_type"]

    db.session.commit()

    return jsonify({"data": app.serialize()}), 200


@api.route('/applications/<int:app_id>', methods=['DELETE'])
def delete_application(app_id):
    app = Application.query.get(app_id)

    if app is None:
        return jsonify({"error": "application not found"}), 404

    db.session.delete(app)
    db.session.commit()

    return jsonify({"data": {"deleted": True, "id": app_id}}), 200
