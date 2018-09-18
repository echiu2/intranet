from flask import (
    request,
    redirect,
    render_template,
    url_for,
    flash,
)
from flask_login import (
    login_user,
    logout_user
)
from app.auth import auth
from app.auth.forms import LoginForm
from app.auth.utils import ldap_authentication
from app.models import Users
from app import login_manager


@login_manager.user_loader
def user_loader(user_id):
    return Users.query.filter_by(id=user_id).first()


@auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    View function to login users using LDAP
    """
    login_form = LoginForm()
    if request.method == 'POST':
        email = login_form.email.data
        password = login_form.password.data

        user = Users.query.filter_by(email=email).first()
        # user = Users.query.filter_by(email='jyu@records.nyc.gov').first()

        if user is not None:
            # authenticated = True
            authenticated = ldap_authentication(email, password)

            if authenticated:
                login_user(user)
                return redirect(url_for('main.index'))

            flash("Invalid username/password combination.", category="danger")
            return render_template('login.html', login_form=login_form)
        else:
            flash("User not found. Please contact your agency FOIL Officer to gain access to the system.",
                  category="warning")
            return render_template('login.html', login_form=login_form)
    return render_template('login.html', login_form=login_form)


@auth.route('/logout', methods=['GET'])
def logout():
    """
    View function to logout users
    """
    logout_user()
    return redirect(url_for('main.index'))