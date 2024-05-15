from flask import Blueprint, render_template, flash, redirect, url_for, abort, request
from flask_login import login_required, current_user, login_user, logout_user
from .models import User, db,Cart, CartItem, Product, Order, OrderItem,ContactFormModel,AppointmentFormModel,TeacherApplication,Testimonial,Facility,Teacher
from .forms import RegisterForm, LoginForm, UpdateForm, ChangePasswordForm, ContactForm, AppointmentForm, TeacherApplicationForm
from flask_bcrypt import Bcrypt,bcrypt
from flask import Flask, jsonify, request


app_bp = Blueprint('app', __name__, template_folder='templates')

page_name=None

from flask import request

@app_bp.route('/', methods=['GET', 'POST'])
def index():
    appointment_form = AppointmentForm()

    testimonials = Testimonial.query.all()
    products = Product.query.all()
    teachers = Teacher.query.all()
    facilities = Facility.query.all()

    if request.method == 'POST':
        if appointment_form.validate_on_submit():
            appointment = AppointmentFormModel(guardian_name=appointment_form.guardian_name.data, guardian_email=appointment_form.guardian_email.data, child_name=appointment_form.child_name.data, child_age=appointment_form.child_age.data, message=appointment_form.message.data)
            db.session.add(appointment)
            db.session.commit()
            flash('Your appointment has been booked!', 'success')
            return redirect(url_for('app.index'))


@app_bp.route('/api/users', methods=['GET'])
@login_required
def get_users():
    if not current_user.is_admin:
        return jsonify({'error': 'You do not have permission to view this page'}), 403

    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

    return render_template('index.html', appointment_form=appointment_form, products=products, facilities=facilities, testimonials=testimonials, teachers=teachers)
@app_bp.route('/about')
def about():
    teachers = Teacher.query.all()
    products = Product.query.all()
    testimonials = Testimonial.query.all()

    return render_template('about.html', page_name="about", teachers=teachers, products=products, testimonials=testimonials)

@app_bp.route('/admin/messages')
@login_required
def admin_messages():
    if not current_user.is_admin:
        abort(403)
    contact_forms = ContactFormModel.query.all()
    appointment_forms = AppointmentFormModel.query.all()
    applications = TeacherApplication.query.all()

    return render_template('admin_message.html', contact_forms=contact_forms,applications=applications, appointment_forms=appointment_forms,page_name="admin messages")


@app_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm(request.form)
    if request.method == 'POST' and form.validate():
        contact_form = ContactFormModel(name=form.name.data, email=form.email.data, subject=form.subject.data, message=form.message.data)
        db.session.add(contact_form)
        db.session.commit()
        return redirect(url_for('app.contact'))
    return render_template('contact.html', page_name="contact", form=form)


@app_bp.route('/appointment', methods=['GET', 'POST'])
def appointment():
    form = AppointmentForm()  
    if request.method == 'POST':
        if form.validate():
            appointment_form = AppointmentFormModel(guardian_name=form.guardian_name.data, guardian_email=form.guardian_email.data, child_name=form.child_name.data, child_age=form.child_age.data, message=form.message.data)
            db.session.add(appointment_form)
            db.session.commit()
            return jsonify({'status': 'success', 'message': 'Appointment created successfully'}), 201
        else:
            return jsonify({'status': 'error', 'errors': form.errors}), 400
    return jsonify({'status': 'error', 'message': 'Invalid method'}), 405


@app_bp.route('/checkout', methods=['GET', 'POST'])
@login_required
def checkout():
    if request.method == 'POST':
        # Fetch the user's current cart
        cart = Cart.query.filter_by(user_id=current_user.id, completed=False).first()

        if cart:
            order = Order(user_id=current_user.id)

            cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

            for item in cart_items:
                order_item = OrderItem(product_id=item.product_id, quantity=item.quantity)
                order.items.append(order_item)

            db.session.add(order)

            cart.completed = True
            db.session.commit()

        return redirect(url_for('app.dashboard', username=current_user.username))
    return render_template('checkout.html')
@app_bp.route('/cart', methods=['GET'])
@login_required
def view_cart():
    cart = Cart.query.filter_by(user_id=current_user.id, completed=False).first()

    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

    total_price = sum(item.product.price * item.quantity for item in cart_items)

    return render_template('cart.html', cart_items=cart_items, total_price=total_price, page_name="cart")

@app_bp.route('/api/add_to_cart/<int:product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    product = Product.query.get_or_404(product_id)
    cart = Cart.query.filter_by(user_id=current_user.id, completed=False).first()

    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    cart_item = CartItem(product_id=product.id, cart_id=cart.id)
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Item added to cart'})

@app_bp.route('/api/remove_from_cart/<int:cart_item_id>', methods=['POST'])
@login_required
def remove_from_cart(cart_item_id):
    cart_item = CartItem.query.get_or_404(cart_item_id)

    if cart_item.cart.user_id != current_user.id:
        abort(403)

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Item removed from cart'})

@app_bp.route('/become-a-teacher')
def call_to_action():
    return render_template('call-to-action.html',page_name="Become a Teacher")


@app_bp.route('/classes', methods=['GET', 'POST'])
def classes():
    form = AppointmentForm()

    testimonials = Testimonial.query.all()
    products = Product.query.all()
    teachers = Teacher.query.all()

    if request.method == 'POST':
        if form.validate():
            appointment_form = AppointmentFormModel(guardian_name=form.guardian_name.data, guardian_email=form.guardian_email.data, child_name=form.child_name.data, child_age=form.child_age.data, message=form.message.data)
            db.session.add(appointment_form)
            db.session.commit()
            return 'Form submitted'
        else:
            print(form.errors)

    return render_template('classes.html', page_name="classes", teachers=teachers, form=form, testimonials=testimonials, products=products)



from flask import jsonify

@app_bp.route('/facility', methods=['GET'])
def facility():
    facilities = Facility.query.all()
    facilities_list = []

    for facility in facilities:
        facilities_list.append({
            "id": facility.id,
            "color": facility.color,
            "icon": facility.icon,
            "name": facility.name,
            "description": facility.description
        })

    return jsonify(facilities_list)

bcrypt = Bcrypt()

@app_bp.route('/change_password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if bcrypt.check_password_hash(current_user.password, form.current_password.data.encode('utf-8')):
            current_user.password = bcrypt.generate_password_hash(form.new_password.data).decode('utf-8')
            db.session.commit()
            flash('Your password has been updated!', 'success')
            return redirect(url_for('app.dashboard', username=current_user.username))
        else:
            flash('Password is incorrect', 'danger')
    return render_template('change_password.html', title='Change Password', form=form, page_name="change password")

from flask_cors import cross_origin
@app_bp.route('/login', methods=['GET', 'POST'])
@cross_origin()  # This allows the route to accept requests from different origins
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        if user and Bcrypt().check_password_hash(user.password, data.get('password')):
            login_user(user)
            return jsonify({'message': 'Login successful', 'username': user.username}), 200
        else:
            return jsonify({'message': 'Login Unsuccessful. Please check username and password'}), 401
    return jsonify({'message': 'GET method successful'}), 200

from flask_login import current_user

@app_bp.route('/api/is_authenticated', methods=['GET'])
@cross_origin()
def is_authenticated():
    if current_user.is_authenticated:
        return jsonify({'isAuthenticated': True, 'username': current_user.username, 'isAdmin': current_user.is_admin}), 200
    else:
        return jsonify({'isAuthenticated': False}), 200

from flask import request, jsonify
from flask_cors import CORS, cross_origin

# Enable CORS for your app
CORS(app_bp)

@app_bp.route('/register', methods=['GET', 'POST'])
@cross_origin()  # This allows the route to accept requests from different origins
def register():
    if request.method == 'POST':
        data = request.get_json()
        hashed_password = Bcrypt().generate_password_hash(data.get('password'))
        user = User(username=data.get('username'), password=hashed_password, Email=data.get('email'))
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'}), 200
    return jsonify({'message': 'Method not allowed'}), 405

@app_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('app.login'))

from flask import jsonify

@app_bp.route('/api/dashboard/<username>', methods=['GET'])
@login_required
def get_dashboard(username):
    if username != current_user.username:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.filter_by(username=username).first_or_404()
    orders = Order.query.filter_by(user_id=user.id).all()

    return jsonify({
        'user': {
            'username': user.username,
            'email': user.email,
        },
        'orders': [order.to_dict() for order in orders],
    })

@app_bp.route('/api/dashboard/<username>', methods=['POST'])
@login_required
def update_dashboard(username):
    if username != current_user.username:
        return jsonify({'error': 'Unauthorized'}), 401

    form = UpdateForm()
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        return jsonify({'message': 'Your account has been updated!'}), 200
    else:
        return jsonify({'error': 'Invalid form data'}), 400



@app_bp.route('/user/<username>/orders', methods=['GET'])
@login_required
def user_orders(username):
    if username != current_user.username:
        return redirect(url_for('app.user_orders', username=current_user.username))
    
    user = User.query.filter_by(username=username).first_or_404()
    orders = Order.query.filter_by(user_id=user.id).all()
    return render_template('user_orders.html', user=user, orders=orders,page_name="user orders")


@app_bp.route('/admin', methods=['GET', 'POST'])
@login_required
def admin_dashboard():
    if not current_user.is_admin:
        flash('You do not have permission to view this page', 'danger')
        return redirect(url_for('app.dashboard', username=current_user.username,page_name="dashboard"))
    
    users = User.query.all()
    orders = Order.query.all()  
    return render_template('admin_dashboard.html', users=users, orders=orders,page_name="admin dashboard")
from flask import jsonify

@app_bp.route('/api/orders', methods=['GET'])
@login_required
def get_orders():
    if not current_user.is_admin:
        return jsonify({'error': 'You do not have permission to view this page'}), 403

    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@app_bp.route('/delete-user/<int:user_id>', methods=['POST'])
@login_required
def delete_user(user_id):
    if not current_user.is_admin:
        abort(403)  # Forbidden
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        flash('User has been deleted.', 'success')
    else:
        flash('User not found.', 'danger')
    return redirect(url_for('app.admin_dashboard'))

from flask import Response

@app_bp.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    response = jsonify([product.serialize() for product in products])
    response.headers['Content-Type'] = 'application/json'
    return response
    

@app_bp.route('/team')
def team():
    products = Product.query.all()
    testimonials = Testimonial.query.all()
    teachers = Teacher.query.all()

    return render_template('team.html', page_name="team", products=products, testimonials=testimonials, teachers=teachers)


@app_bp.route('/api/testimonial', methods=['GET'])
def get_testimonial_data():
    products = [product.serialize() for product in Product.query.all()]
    testimonials = [testimonial.serialize() for testimonial in Testimonial.query.all()]
    teachers = [teacher.serialize() for teacher in Teacher.query.all()]

    return jsonify({
        'products': products,
        'testimonials': testimonials,
        'teachers': teachers
    })
@app_bp.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html',page_name="404"), 404

