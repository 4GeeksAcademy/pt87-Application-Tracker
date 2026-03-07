"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, current_user
from api.models import db, User, Application
from api.utils import generate_sitemap, APIException
import traceback

api = Blueprint('api', __name__)

# CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message that came from the backend."}), 200


@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    if db.session.scalars(db.select(User).filter_by(username=data.get("username"))).first():
        return jsonify(msg="Username already taken"), 400
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    return jsonify(user.serialize()), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    user = db.session.scalars(
        db.select(User).filter_by(username=data.get("username"))
    ).one_or_none()
    if not user or not user.check_password_hash(data.get("password", "")):
        return jsonify(msg="Invalid username or password"), 401
    return jsonify(token=create_access_token(identity=user)), 200


@api.route("/changepwd", methods=["PATCH", "PUT"])
@jwt_required()
def changepwd():
    data = request.get_json() or {}
    if not data.get("password"):
        return jsonify(msg="Invalid password."), 400
    current_user.password = data.get("password")
    db.session.merge(current_user)
    db.session.commit()
    db.session.refresh(current_user)
    return jsonify(current_user.serialize()), 200


@api.route("/me", methods=["GET"])
@jwt_required()
def me():
    return jsonify(current_user.serialize()), 200


@api.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    try:
        if current_user is None:
            return jsonify({"error": "current_user is None"}), 401

        applications = db.session.scalars(
            db.select(Application)
            .filter_by(user_id=current_user.id)
            .order_by(Application.id.desc())
        ).all()

        return jsonify({"data": [app.serialize() for app in applications]}), 200

    except Exception as e:
        return jsonify({
            "error": str(e),
            "traceback": traceback.format_exc()
        }), 500


@api.route('/applications', methods=['POST'])
@jwt_required()
def create_application():
    data = request.get_json() or {}

    company = (data.get("company") or "").strip()
    role = (data.get("role") or "").strip()

    if not company or not role:
        return jsonify({"error": "company and role are required"}), 400

    new_app = Application(
        company=company,
        role=role,
        location=(data.get("location") or "").strip() or None,
        application_date=(data.get("application_date") or "").strip() or None,
        status=(data.get("status") or "Interested").strip(),
        notes=(data.get("notes") or "").strip() or None,
        employment_type=(data.get("employment_type") or "").strip() or None,
        user_id=current_user.id,
    )
    db.session.add(new_app)
    db.session.commit()
    return jsonify({"data": new_app.serialize()}), 201


@api.route('/applications/<int:app_id>', methods=['GET'])
@jwt_required()
def get_application(app_id):
    app = db.session.get(Application, app_id)

    if app is None or app.user_id != current_user.id:
        return jsonify({"error": "application not found"}), 404

    return jsonify({"data": app.serialize()}), 200


@api.route('/applications/<int:app_id>', methods=['PUT'])
@jwt_required()
def update_application(app_id):
    data = request.get_json() or {}
    app = db.session.get(Application, app_id)

    if app is None or app.user_id != current_user.id:
        return jsonify({"error": "application not found"}), 404

    for field in ["company", "role", "location", "application_date", "status", "notes", "employment_type"]:
        if field in data and data[field] is not None:
            value = data[field]
            if isinstance(value, str):
                value = value.strip()
            setattr(app, field, value if value != "" else None)

    if not app.company or not app.role:
        return jsonify({"error": "company and role are required"}), 400

    db.session.commit()
    return jsonify({"data": app.serialize()}), 200


@api.route('/applications/<int:app_id>', methods=['DELETE'])
@jwt_required()
def delete_application(app_id):
    app = db.session.get(Application, app_id)
    if app is None or app.user_id != current_user.id:
        return jsonify({"error": "application not found"}), 404

    db.session.delete(app)
    db.session.commit()
    return jsonify({"data": {"deleted": True, "id": app_id}}), 200
