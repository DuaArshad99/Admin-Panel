# routes/retirement_routes.py
from flask import Blueprint
from controller.retirement_controller import (
    get_user_retirements_controller,
    retire_credits_controller,
    get_retirement_proof_controller,
    get_retirement_audit_controller
)

retire_bp = Blueprint('retirements', __name__, url_prefix='/api/retirements')

@retire_bp.route('/user/<string:user_id>', methods=['GET'])
def get_user_retirements(user_id):
    return get_user_retirements_controller(user_id)

@retire_bp.route('/retire', methods=['POST'])
def retire_credits():
    return retire_credits_controller()

@retire_bp.route('/<string:retire_id>/proof', methods=['GET'])
def get_retirement_proof(retire_id):
    return get_retirement_proof_controller(retire_id)

@retire_bp.route('/<string:retire_id>/audit', methods=['GET'])
def get_retirement_audit(retire_id):
    return get_retirement_audit_controller(retire_id)
