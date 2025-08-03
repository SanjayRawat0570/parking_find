from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv  # ✅ Add this
load_dotenv()                   # ✅ Load environment variables

from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from routes.user_routes import user_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(user_bp, url_prefix="/user")

@app.route("/")
def home():
    return {"message": "SmartPark Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)


