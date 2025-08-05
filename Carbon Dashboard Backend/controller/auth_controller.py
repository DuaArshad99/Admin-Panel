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


# Get user profile
def get_profile_controller():
    user_id = request.args.get("userId")
    
    if not user_id:
        return jsonify({"error": "userId is required"}), 400

    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        user["_id"] = str(user["_id"])  # Convert ObjectId to string for JSON
        return jsonify({"profile": user}), 200

    except Exception:
        return jsonify({"error": "Invalid userId"}), 400

# Update user profile
def update_profile_controller():
    data = request.json
    user_id = data.get("_id")

    if not user_id:
        return jsonify({"error": "id is required to identify user"}), 400

    try:
        obj_id = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid _id format"}), 400

    update_fields = {
        "walletAddress": data.get("walletAddress"),
        "email": data.get("email"),
        "companyName": data.get("companyName"),
        "role": data.get("role"),
        "kycStatus": data.get("kycStatus"),
        "preferences": data.get("preferences"),
        "updatedAt": datetime.now(timezone.utc)
    }

    update_fields = {k: v for k, v in update_fields.items() if v is not None} # Remove None values

    result = mongo.db.users.update_one({"_id": obj_id}, {"$set": update_fields})

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "Profile updated successfully"})


#create user
def create_user_controller():
    data = request.json
    now = datetime.now(timezone.utc)

    required_fields = ["firstName", "lastName", "email", "role"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    # Check for existing email
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already exists"}), 400

    new_user = {
        "firstName": data["firstName"],
        "lastName": data["lastName"],
        "email": data["email"],
        "phone": data.get("phone", ""),
        "role": data["role"],
        "department": data.get("department", ""),
        "location": data.get("location", ""),
        "status": data.get("status", "Active"),
        "bio": data.get("bio", ""),
        "joinDate": data.get("joinDate", ""),
        "createdAt": now,
        "updatedAt": now,
    }

    result = mongo.db.users.insert_one(new_user)
    return jsonify({"message": "User created successfully", "userId": str(result.inserted_id)}), 201


# Delete user
def delete_user_controller(user_id):
    try:
        result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500