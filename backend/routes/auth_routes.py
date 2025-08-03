from flask import Blueprint, request, jsonify
from utils.mongo_client import users_collection
from utils.jwt_utils import generate_token
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    name = data.get("name", "User")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    user = {
        "email": email,
        "password": hashed,
        "name": name,
        "role": "user"
    }

    users_collection.insert_one(user)
    token = generate_token(user)
    return jsonify({"message": "Signup successful", "token": token})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = users_collection.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = generate_token(user)
    return jsonify({"message": "Login successful", "token": token})

