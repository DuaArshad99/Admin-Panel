from flask import Blueprint
from controller.auth_controller import (
    wallet_login_controller,
    email_login_controller,
    get_profile_controller,
    update_profile_controller,
    create_user_controller,
    delete_user_controller
)

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/wallet-login', methods=['POST'])
def wallet_login():
    return wallet_login_controller()

@auth_bp.route('/email-login', methods=['POST'])
def email_login():
    return email_login_controller()

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    return get_profile_controller()

@auth_bp.route('/profile', methods=['PUT'])
def update_profile():
    return update_profile_controller()

@auth_bp.route('', methods=['POST'])
def create_user():
    return create_user_controller()

@auth_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    return delete_user_controller(user_id)
