from flask import Flask
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from mvc.views import app_bp
from mvc.models import db, User, Product, Cart, CartItem,ContactFormModel,AppointmentFormModel  

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SECRET_KEY"] = "a1b2c3d4e5f6g7h8i9j00*49t405t428rt4298t4"

login_manager = LoginManager(app)
login_manager.login_view = "app.login"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

db.init_app(app)
bcrypt = Bcrypt(app)

app.register_blueprint(app_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)