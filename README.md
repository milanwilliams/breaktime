BREAKTIME WEBAPP DOCUMENTATION
=============
# About Breaktime

Breaktime is a 501(c)(3) non-profit working to end young adult homelessness. They operate Boston’s first transitional employment program for young adults experiencing homelessness that helps young adults launch their careers, nurture their talents, and serve their communities. Through this early intervention that focuses on financial and personal empowerment, Breaktime helps prevent long-term chronic homelessness and supports young adults in becoming changemakers.

# Purpose of Webapp

Previously, Breaktime did not have a web application to connect their users and employees, and efficiently keep track of their internal documentation. The need for a webapp is evenmore so important now due to the challenges that came with COVID - 19. 

### Goals
 The goals ** of this webapp are to :
- Have high attendance at weekly seminar
- Organized location for assignments
- Digital record of timesheet for payroll

### Impact
Thus, this webpp allows Breaktime Associates by :
- Keeping track of their weekly seminar times
- Submit weekly assignments
- Input their shift hours

# To run webapp

1. Clone the repository locally. 
    For steps vist, [title](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
2. cd to the cloned folder
3. Set up backend
    - cd breaktimebackend
    - pip install pipenv
    - pipenv shell
    - pipenv install django
    - 
    - python manage.py runserver
4. Set up frontend
    - cd src
    - yarn install
    - yarn start
    Navigate to [title](http://localhost:3000/) if the browser does not open a tab.

# Signup, Login, Authentication

## Back End

The backend capabilities were set up in the breaktimebackend/breaktimebackend directory. Specifically, `urls.py` extends all of the djoser urls through the `auth/` path. 

Djoser is customized in `settings.py,` with DJOSER = { ... }. Note that the email used to send activation / password reset confirmations is customized with `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`. You can also turn off user activation / password confirmation in the djoser options. Furthermore, we override the default djoser user creation serializer with breaktimeapi.serializers.CustomUserSerializer, which holds the custom user model (in breaktimeapi/seralizers.py) 

Refer to the djoser documentation for information on what each option in the djoser setup does: https://readthedocs.org/projects/djoser/downloads/pdf/latest/. 

## Front End

The front-end logic is handled in the src directory. In particular, the actions, contianers, and reducers folders contain all of the logic for handling user auth in the front end. 

### Actions

To modify the Redux state, you need to send out an action (takes arguments, forms payload, and sends over to Redux). 
The `types.js`, which is more so for interoperability than being a requirement, defines string constants for the action names. 

#### auth.js

This script handles all communications to djoser in the backend with respect to login, logout, registration, authentication, verification, activation. Communication with the bakcend is specifically handled through axios post requests. Here's specifically what each post request is feeding to the backend and where specifically:

1. `checkAuthenticated()` - an access token from local storage is sent to /auth/jwt/verify, which checks if the JWT is authenticated or not.
2. `load_user()` - passes a JWT to the /auth/users/me/ to obtain user information on login.
3. `login()` - passes a username and password as a JSON string to /auth/jwt/create. If the credentials are correct, then a JWT is produced, the user is redirected to the landing page, and load_user() is called.
4. `signup()` - passes first name, last name, employee id, username, and password to the /auth/users/create endpoint in the backend


#### types.js

This file defines all of the constants that will be passed around to indicate state changes. Refer to the file to see all of the constants used; their names should explain their purpose. 

**NOTE**: `process.env.REACT_APP_API_URL` was set to the domain of the backend in the .env file

Regarding reset_password, there is preliminary code for resetting password / confirming it through email and the backend has been equipped to handle this, but this feature hasn't been fully tested yet and likely contains bugs. 

### Containers

These containers build the webpages that the user interacts with directly while calling to the the logic defined in auth.js. These containers deliver the user input to the methods in auth.js and also handle navigating between the pages on the website through redirects. 

### Reducers

Redux passes its current state to a reducer - modifies existing state and returns new state replacing current one, triggering reload of affected components. 

Most of the business logic lies here (`auth.js` ). Most common set up is with a switch statement handling case based on action type. In this case, you can see the switch statements based on the constant value (defined in `types.js`) passed to the reducer. 

`index.js` in reducers essentially passes in feature reducer: auth to create a single top-level reducer passed to store. 
