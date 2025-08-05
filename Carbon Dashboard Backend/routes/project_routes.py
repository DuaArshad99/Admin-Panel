# routes/project_routes.py
from flask import Blueprint
from controller.project_controller import (
    get_projects_controller,
    get_project_controller,
    create_project_controller,
    search_projects_controller,
    delete_project_controller,
    update_project_controller
)

projects_bp = Blueprint('projects', __name__, url_prefix='/api/projects')

@projects_bp.route('', methods=['GET'])
def get_projects():
    return get_projects_controller()

@projects_bp.route('/<string:project_id>', methods=['GET'])
def get_project(project_id):
    return get_project_controller(project_id)

@projects_bp.route('', methods=['POST'])
def create_project():
    return create_project_controller()

@projects_bp.route('/search', methods=['GET'])
def search_projects():
    return search_projects_controller()

@projects_bp.route('/<string:project_id>', methods=['DELETE'])
def delete_project(project_id):
    return delete_project_controller(project_id)

@projects_bp.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    return update_project_controller(project_id)

