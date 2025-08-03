from services.redis_client import redis_client
import json

def add_slot(data):
    slot_id = f"slot:{data['id']}"
    redis_client.set(slot_id, json.dumps(data))
    redis_client.sadd("all_slots", slot_id)
    return {"message": "Slot added", "slot": data}

def get_all_slots():
    slot_ids = redis_client.smembers("all_slots")
    slots = []
    for sid in slot_ids:
        raw = redis_client.get(sid)
        if raw:
            slots.append(json.loads(raw))
    return slots
