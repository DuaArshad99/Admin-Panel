from flask import request, jsonify
from db import mongo
from models import project_schema
from bson.objectid import ObjectId

# Get all projects
def get_projects_controller():
    projects = list(mongo.db.projects.find())
    for project in projects:
        project["_id"] = str(project["_id"])
    return jsonify({"projects": projects})


# Get specific project by ID
def get_project_controller(project_id):
    try:
        project = mongo.db.projects.find_one({"_id": ObjectId(project_id)})
        if not project:
            return jsonify({"error": "Project not found"}), 404

        project["_id"] = str(project["_id"])  # Convert ObjectId to string
        return jsonify(project)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create new project
def create_project_controller():
    data = request.json
    if not data:
        return jsonify({"error": "Missing payload"}), 400
    project = {
        "Project Name": data.get("name", "").strip(),
        "Id": data.get("projectId", "").strip(),
        "Developer": data.get("developer", "").strip(),
        "Registry": data.get("registry", "").strip(),
        "Methodology": data.get("methodology", "").strip(),
        "Sector": data.get("sector", "").strip(),
        "Country": data.get("country", "").strip(),
        "Project Status": data.get("status", "").strip(),
        "Crediting Period Start": data.get("creditingStart", "").strip(),
        "Crediting Period End": data.get("creditingEnd", "").strip(),
        "Annual Est. Units": data.get("annualUnits", "").strip(),
        "Total Issued Units": data.get("issuedUnits", "").strip(),
        "Total Retired Units": data.get("retiredUnits", "").strip(),
        "Total Available Units": data.get("availableUnits", "").strip(),
        "Price": data.get("price", "").strip(),
        #"Description": data.get("description", "").strip(),
        #"Co-benefits": data.get("coBenefits", [])  # expects list from frontend
    }

    required_fields = ["Project Name", "Id", "Developer"]
    for field in required_fields:
        if not project[field]:
            return jsonify({"error": f"{field} is required"}), 400

    # Insert into MongoDB
    result = mongo.db.projects.insert_one(project)

    return jsonify({"message": "Project created successfully", "projectId": str(result.inserted_id)}), 201

# Search/filter projects 
def search_projects_controller():
    search_term = request.args.get("q", "")
    if not search_term:
        return jsonify({"results": []})

    regex = {"$regex": search_term, "$options": "i"}

    query = {
        "$or": [
            {"Project Name": regex},
            {"Country": regex},
            {"Sector": regex},
            {"Registry": regex},
            {"Developer": regex}
        ]
    }

    results = list(mongo.db.projects.find(query))

    for r in results:
        r["_id"] = str(r["_id"])

    return jsonify({"results": results})

# Delete Project
def delete_project_controller(project_id):
    result = mongo.db.projects.delete_one({"_id": ObjectId(project_id)})
    
    if result.deleted_count == 1:
        return jsonify({"message": "Project deleted successfully"}), 200
    else:
        return jsonify({"error": "Project not found"}), 404

# update project
def update_project_controller(project_id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided for update"}), 400
        update_result = mongo.db.projects.update_one(
            {"_id": project_id},
            {"$set": data}
        )
        if update_result.matched_count == 0:
            return jsonify({"error": "Project not found"}), 404
        return jsonify({"message": "Project updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500