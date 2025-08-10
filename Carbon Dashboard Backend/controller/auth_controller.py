from flask import request, jsonify
from db import mongo
from datetime import datetime, timezone
from bson.objectid import ObjectId

#wallet authentication
def wallet_login_controller():
    data = request.json
    wallet = data.get("walletAddress")

    if not wallet:
        return jsonify({"error": "Wallet Address is required"}), 400

    user = mongo.db.users.find_one({"walletAddress": wallet})

    if not user:
       return jsonify({"error": "Wallet Address does not exists"}), 400

    return jsonify({"message": "Wallet login successful","walletAddress": wallet}), 200


# Email login
def email_login_controller():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = mongo.db.users.find_one({"email": email})

    if not user:
        return jsonify({"error": "User does not exist"}), 400

    return jsonify({"message": "Email login successful",  "email": email,  "role": user.get("role", "user")}), 200


#create user
def create_user_controller():
    data = request.json
    if not data:
        return jsonify({"error": "Missing payload"}), 400

    required_fields = ["firstName", "lastName", "email", "phone", "role", "department", "status", "location", "joinDate"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    new_user = {
        "firstName": data.get("firstName", "").strip(),
        "lastName": data.get("lastName", "").strip(),
        "email": data.get("email", "").strip(),
        "phone": data.get("phone", "").strip(),
        "role": data.get("role", "Viewer").strip(),
        "department": data.get("department", "").strip(),
        "location": data.get("location", "").strip(),
        "status": data.get("status", "Active").strip(),
        "bio": data.get("bio", "").strip(),
        "joinDate": data.get("joinDate", "").strip(),
        "permissions": data.get("permissions", {
            "canCreateProjects": False,
            "canEditProjects": False,
            "canDeleteProjects": False,
            "canManageUsers": False,
            "canViewAnalytics": True,
            "canIssueCertificates": False,
        }),
    }

    result = mongo.db.users.insert_one(new_user)
    return jsonify({"message": "User  created successfully", "userId": str(result.inserted_id)}), 201


# get all user
def get_all_user_controller():
    users = list(mongo.db.users.find())
    for user in users:
        user["_id"] = str(user["_id"])
    return jsonify({"users": users})

# Get specific user by ID
def get_user_controller(user_id):
    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Search/filter 
def search_users_controller():
    try:
        query = request.args.get("query", '')
        if not query:
            return jsonify([]), 200

        regex = {"$regex": query, "$options": "i"}  

        # Try to convert input to int or float if possible
        numeric_query = None
        try:
            if "." in query:
                numeric_query = float(query)
            else:
                numeric_query = int(query)
        except:
            numeric_query = None  # Not a number

        # Build filter
        search_filter = {
            "$or": [
                {"firstName": regex},
                {"lastName": regex},
                {"location": regex},
                {"department": regex},
                {"role": regex},
                {"status": regex},
                {"bio": regex},
                {"email": regex},
                {"Crediting Period End": regex},
            ]
        }

        # Add numeric fields if input is a number
        if numeric_query is not None:
            search_filter["$or"].extend([
                {"email": numeric_query},
                {"phone": numeric_query},
                {"joinDate": numeric_query},
            ])

        users = list(mongo.db.users.find(search_filter))
        for user in users:
            user["_id"] = str(user["_id"])
        return jsonify(users), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete Project
def delete_user_controller(user_id):
    try:
        if not ObjectId.is_valid(user_id):
            return jsonify({"error": "Invalid user ID"}), 400

        result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})

        if result.deleted_count == 1:
            return jsonify({"message": "User  deleted successfully"}), 200
        else:
            return jsonify({"error": "User  not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
