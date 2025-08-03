from flask import Blueprint, request, jsonify
from services.slot_service import add_slot, get_all_slots

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/slot/add", methods=["POST"])
def add_parking_slot():
    data = request.json
    result = add_slot(data)
    return jsonify(result)

@admin_bp.route("/slots", methods=["GET"])
def view_slots():
    return jsonify(get_all_slots())
