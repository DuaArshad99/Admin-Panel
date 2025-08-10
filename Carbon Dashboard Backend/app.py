from flask import Flask
from flask_cors import CORS
from db import init_db

from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.project_routes import projects_bp
from routes.retirement_routes import retire_bp
def print_debug_info(app):
    print("\n📌 Registered Blueprints:")
    for name, blueprint in app.blueprints.items():
        print(f"  - {name} -> url_prefix={blueprint.url_prefix}")

    print("\n📌 Registered Routes:")
    for rule in app.url_map.iter_rules():
        methods = ",".join(sorted(rule.methods))
        print(f"  {rule.rule} [{methods}] -> {rule.endpoint}")
    print("\n" + "-"*50 + "\n")

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # for frontend

# MongoDB
init_db(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(retire_bp)

print_debug_info(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
