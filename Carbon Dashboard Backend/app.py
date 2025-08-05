from flask import Flask
from flask_cors import CORS
from db import init_db

from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.project_routes import projects_bp
from routes.retirement_routes import retire_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # for frontend

# MongoDB
init_db(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(retire_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
