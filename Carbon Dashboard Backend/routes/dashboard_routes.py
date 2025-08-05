# routes/dashboard_routes.py
from flask import Blueprint
from controller.dashboard_controller import (
    get_overview_controller,
    get_monthly_offsets_controller,
    get_project_breakdown_controller,
    get_esg_score_controller
)

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/overview', methods=['GET'])
def get_overview():
    return get_overview_controller()

@dashboard_bp.route('/monthly-offsets', methods=['GET'])
def get_monthly_offsets():
    return get_monthly_offsets_controller()

@dashboard_bp.route('/project-breakdown', methods=['GET'])
def get_project_breakdown():
    return get_project_breakdown_controller()

@dashboard_bp.route('/esg-score', methods=['GET'])
def get_esg_score():
    return get_esg_score_controller()
