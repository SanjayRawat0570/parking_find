# services/redis_client.py
import redis
import os
from dotenv import load_dotenv

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

if not REDIS_URL:
    raise ValueError("REDIS_URL is not set!")

redis_client = redis.StrictRedis.from_url(
    REDIS_URL,
    decode_responses=True
)





