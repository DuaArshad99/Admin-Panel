# controllers/retirement_controller.py
from flask import request, jsonify
from db import mongo
from models import retirement_schema
from bson.objectid import ObjectId

# Get user's retirement records
def get_user_retirements_controller(user_id):
    records = list(mongo.db.retirements.find({"userId": user_id}))
    for r in records:
        r["_id"] = str(r["_id"])
    return jsonify({"userId": user_id, "retirements": records})


# create retirement record
def retire_credits_controller():
    data = request.json
    if not data or "tokenId" not in data or "userId" not in data:
        return jsonify({"error": "tokenId and userId are required"}), 400

    retirement = retirement_schema(data)
    result = mongo.db.retirements.insert_one(retirement)

    mongo.db.credits.update_one(
        {"tokenId": data["tokenId"]},
        {"$set": {"status": "retired"}}
    )

    return jsonify({"message": "Carbon credits retired", "retirementId": str(result.inserted_id)}), 201


# Get retirement proof document
def get_retirement_proof_controller(retire_id):
    try:
        record = mongo.db.retirements.find_one({"_id": ObjectId(retire_id)})
        if not record:
            return jsonify({"error": "Retirement record not found"}), 404

        return jsonify({
            "retireId": retire_id,
            "ipfsProofHash": record.get("ipfsProofHash", "")
        })
    except Exception:
        return jsonify({"error": "Invalid retirement ID"}), 400


# Get audit report for a retirement
def get_retirement_audit_controller(retire_id):
    try:
        record = mongo.db.retirements.find_one({"_id": ObjectId(retire_id)})
        if not record:
            return jsonify({"error": "Retirement record not found"}), 404

        return jsonify({
            "retireId": retire_id,
            "auditReport": record.get("auditReport", {})
        })
    except Exception:
        return jsonify({"error": "Invalid retirement ID"}), 400
