# controllers/dashboard_controller.py
from flask import jsonify
from db import mongo

# Dashboard KPIs 
def get_overview_controller():
    users = mongo.db.users.count_documents({})
    projects = mongo.db.projects.count_documents({})
    credits = mongo.db.credits.count_documents({"status": "active"})
    retired = mongo.db.retirements.count_documents({})

    overview = {
        "totalUsers": users,
        "totalProjects": projects,
        "activeCredits": credits,
        "totalRetirements": retired
    }
    return jsonify({"overview": overview})


# Monthly carbon offsets (grouped by month)
def get_monthly_offsets_controller():
    pipeline = [
        {
            "$group": {
                "_id": { "$month": "$createdAt" },
                "totalOffset": { "$sum": "$totalOffset" }
            }
        },
        { "$sort": { "_id": 1 } }
    ]

    results = list(mongo.db.projects.aggregate(pipeline))
    data = [{"month": r["_id"], "offset": r["totalOffset"]} for r in results]

    return jsonify({"monthlyOffsets": data})


# Breakdown of projects by type... type and its count
def get_project_breakdown_controller():
    pipeline = [
        {
            "$group": {
                "_id": "$Sector",
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"count": -1}}
    ]
    results = list(mongo.db.projects.aggregate(pipeline))
    data = [{"Sector": r["_id"], "count": r["count"]} for r in results]

    return jsonify({"projectBreakdown": data})


# Sample ESG score calculation
def get_esg_score_controller():
    # Simulated score for demo
    total_projects = mongo.db.projects.count_documents({})
    total_retirements = mongo.db.retirements.count_documents({})
    
    esg_score = min(100, total_retirements * 10 + total_projects * 5)
    
    return jsonify({"esgScore": esg_score})
