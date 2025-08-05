from datetime import datetime, timezone

# User Schema
def user_schema(data):
    now = datetime.now(timezone.utc)
    return {
        "walletAddress": data.get("walletAddress"),
        "firstName": data.get("firstName"),
        "lastName": data.get("lastName"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "walletAddress": data.get("walletAddress"),
        "companyName": data.get("companyName"),
        "role": data.get("role", "user"),
        "department": data.get("department"),
        "location": data.get("location"),
        "status": data.get("status", "Active"),
        "bio": data.get("bio"),
        "joinDate": data.get("joinDate"),
        "permissions": data.get("permissions", {
            "canCreateProjects": False,
            "canEditProjects": False,
            "canDeleteProjects": False,
            "canManageUsers": False,
            "canViewAnalytics": True,
            "canIssueCertificates": False,
        }),
        "kycStatus": data.get("kycStatus", "pending"),
        "preferences": data.get("preferences", {
            "notifications": True,
            "reportFrequency": "monthly"
        }),
        "createdAt": now,
        "updatedAt": now
    }


# Carbon Project Schema
def project_schema(data):
    now = datetime.now(timezone.utc)
    return {
        "Project Name": data.get("Project Name"),
        "Id": data.get("Id"),
        "Developer": data.get("Developer"),
        "Registry": data.get("Registry"),
        "Methodology": data.get("Methodology"),
        "Sector": data.get("Sector"),
        "Country": data.get("Country"),
        "Project Status": data.get("Project Status", "active"),
        "Crediting Period Start": data.get("Crediting Period Start"),
        "Crediting Period End": data.get("Crediting Period End"),
        "Annual Est. Units": data.get("Annual Est. Units", 0.0),
        "Total Issued Units": data.get("Total Issued Units", 0.0),
        "Total Retired Units": data.get("Total Retired Units", 0.0),
        "Total Available Units": data.get("Total Available Units", 0.0),
        "Price": data.get("Price", 0.0)
    }

# Carbon Credit Schema
def credit_schema(data):
    now = datetime.now(timezone.utc)
    return {
        "tokenId": data.get("tokenId"),
        "projectId": data.get("projectId"),
        "userId": data.get("userId"),
        "amount": data.get("amount"),  
        "vintageYear": data.get("vintageYear"),
        "issuanceDate": data.get("issuanceDate", now),
        "status": data.get("status"), 
        "blockchainTxHash": data.get("blockchainTxHash"),
        "smartContractAddress": data.get("smartContractAddress"),
        "ipfsMetadataHash": data.get("ipfsMetadataHash"),
        "serialNumber": data.get("serialNumber"),
        "createdAt": now,
        "updatedAt": now
    }

# Retirement Record Schema
def retirement_schema(data):
    now = datetime.now(timezone.utc)
    return {
        "tokenId": data.get("tokenId"),
        "userId": data.get("userId"),
        "projectId": data.get("projectId"),
        "retiredAmount": data.get("retiredAmount"),
        "retirementDate": data.get("retirementDate", now),
        "retirementReason": data.get("retirementReason"),
        "beneficiaryInfo": data.get("beneficiaryInfo", {
            "name": "",
            "description": ""
        }),
        "blockchainTxHash": data.get("blockchainTxHash"),
        "ipfsProofHash": data.get("ipfsProofHash"),
        "auditReport": data.get("auditReport", {
            "fileName": "",
            "ipfsHash": "",
            "auditorName": "",
            "auditDate": now
        }),
        "retirementCertificate": data.get("retirementCertificate", {
            "certificateId": "",
            "ipfsHash": "",
            "generatedAt": now
        }),
        "createdAt": now
    }
