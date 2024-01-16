from flask import Blueprint, render_template, flash, redirect, url_for, abort, request
from flask_login import login_required, current_user, login_user, logout_user
from .models import User, db,Cart, CartItem, Product, Order, OrderItem,ContactFormModel,AppointmentFormModel,TeacherApplication,Testimonial,Facility,Teacher
from .forms import RegisterForm, LoginForm, UpdateForm, ChangePasswordForm, ContactForm, AppointmentForm, TeacherApplicationForm
from flask_bcrypt import Bcrypt,bcrypt


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
        return redirect(url_for('contact'))
    return render_template('contact.html', page_name="contact", form=form)

@app_bp.route('/appointment', methods=['GET', 'POST'])
def appointment():
    form = AppointmentForm()  
    if request.method == 'POST':
        if form.validate():
            appointment_form = AppointmentFormModel(guardian_name=form.guardian_name.data, guardian_email=form.guardian_email.data, child_name=form.child_name.data, child_age=form.child_age.data, message=form.message.data)
            db.session.add(appointment_form)
            db.session.commit()
            return redirect(url_for('appointment'))
        else:
            print(form.errors)
    return render_template('appointment.html', page_name="appointment", form=form)


@app_bp.route('/checkout', methods=['GET', 'POST'])
@login_required
def checkout():
    if request.method == 'POST':
        
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

@app_bp.route('/add_to_cart/<int:product_id>', methods=['POST'])
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

    return redirect(url_for('app.view_cart'))
@app_bp.route('/remove_from_cart/<int:cart_item_id>', methods=['POST'])
@login_required
def remove_from_cart(cart_item_id):
    cart_item = CartItem.query.get_or_404(cart_item_id)

    if cart_item.cart.user_id != current_user.id:
        abort(403)

    db.session.delete(cart_item)
    db.session.commit()

    return redirect(url_for('app.view_cart'),page_name="cart")


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



@app_bp.route('/facility')
def facility():
    facilities = Facility.query.all()

    return render_template('facility.html', page_name="facility", facilities=facilities)

@app_bp.route('/apply', methods=['POST'])
def apply():
    name = request.form.get('name')
    email = request.form.get('email')
    experience = request.form.get('experience')

    application = TeacherApplication(name=name, email=email, experience=experience)
    db.session.add(application)
    db.session.commit()

    return render_template('call-to-action.html')

@app_bp.route('/change_password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if bcrypt.check_password_hash(current_user.password, form.current_password.data):
            current_user.password = bcrypt.generate_password_hash(form.new_password.data).decode('utf-8')
            db.session.commit()
            flash('Your password has been updated!', 'success')
            return redirect(url_for('app.dashboard', username=current_user.username))
        else:
            flash('Password is incorrect', 'danger')
    return render_template('change_password.html', title='Change Password', form=form,page_name="change password")

@app_bp.route('/login', methods=['GET', 'POST'])
def login():
    form=LoginForm()
    
    if form.validate_on_submit():
        user=User.query.filter_by(username=form.username.data).first()
        if user and Bcrypt().check_password_hash(user.password,form.password.data):
            login_user(user)
            return redirect(url_for('app.dashboard',username=current_user.username))
        else:
            flash("Login Unsuccessful. Please check username and password")
    return render_template('login.html',page_name="login",form=form)

@app_bp.route('/register', methods=['GET', 'POST'])
def register():
    form=RegisterForm()
    
    if form.validate_on_submit():
        hashed_password=Bcrypt().generate_password_hash(form.password.data)
        user=User(username=form.username.data,password=hashed_password,Email=form.Email.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('app.login'))
    
    return render_template('register.html',page_name="register",form=form)

@app_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('app.login'))

@app_bp.route('/dashboard/<username>', methods=['GET', 'POST'])
@login_required
def dashboard(username):
    if username != current_user.username:
        return redirect(url_for('app.dashboard', username=current_user.username))
    
    user = User.query.filter_by(username=username).first_or_404()
    form = UpdateForm()
    orders = Order.query.filter_by(user_id=user.id).all()  

    if form.validate_on_submit():
        if user.id == current_user.id:
            current_user.username = form.username.data
            current_user.Email = form.Email.data
            db.session.commit()
            flash('Your account has been updated!', 'success')
            return redirect(url_for('app.dashboard', username=current_user.username))
        else:
            flash('You cannot update another user\'s information!', 'danger')
            return redirect(url_for('app.dashboard', username=current_user.username))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.Email.data = current_user.Email

    return render_template('dashboard.html', page_name="dashboard", user=user, form=form, orders=orders)



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
    return render_template('admin_dashboard.html', users=users, orders=orders, page_name="admin dashboard")

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
    return redirect(url_for('app.admin_dashboard'),page_name="admin dashboard")
    

@app_bp.route('/team')
def team():
    products = Product.query.all()
    testimonials = Testimonial.query.all()
    teachers = Teacher.query.all()

    return render_template('team.html', page_name="team", products=products, testimonials=testimonials, teachers=teachers)

@app_bp.route('/testimonial')
def testimonial():
    products = Product.query.all()
    testimonials = Testimonial.query.all()
    teachers = Teacher.query.all()

    return render_template('testimonial.html', page_name="testimonial", products=products, testimonials=testimonials, teachers=teachers)

@app_bp.app_errorhandler(404)
def page_not_found(e):
    return render_template('404.html',page_name="404"), 404

