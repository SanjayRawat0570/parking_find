import uuid

def generate_id(prefix="id"):
    return f"{prefix}-{str(uuid.uuid4())[:8]}"
