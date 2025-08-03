from flask import Blueprint, request, jsonify
from services.slot_service import get_all_slots

user_bp = Blueprint("user", __name__)

@user_bp.route("/slots", methods=["GET"])
def available_slots():
    return jsonify(get_all_slots())