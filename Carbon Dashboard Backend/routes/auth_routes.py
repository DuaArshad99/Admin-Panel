from flask import Blueprint
from controller.auth_controller import (
    wallet_login_controller,
    email_login_controller,
    get_all_user_controller,
    get_user_controller,
    #update_profile_controller,
    create_user_controller,
    delete_user_controller
)

auth_bp = Blueprint('users', __name__, url_prefix='/api/users')

@auth_bp.route('/wallet-login', methods=['POST'])
def wallet_login():
    return wallet_login_controller()

@auth_bp.route('/email-login', methods=['POST'])
def email_login():
    return email_login_controller()

@auth_bp.route('', methods=['GET'])
def get_profile():
    return get_all_user_controller()

@auth_bp.route('/<string:user_id>', methods=['GET'])
def get_one_profile(user_id):
    return get_user_controller(user_id)

#@auth_bp.route('/update', methods=['PUT'])
#def update_profile():
 #   return update_profile_controller()

@auth_bp.route('', methods=['POST'])
def create_user():
    return create_user_controller()

@auth_bp.route('/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return delete_user_controller(user_id)
