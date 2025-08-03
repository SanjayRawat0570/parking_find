from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["smartpark"]
users_collection = db["users"]
