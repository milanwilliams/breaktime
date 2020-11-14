# Getting started 
Using your choice of virtual environment (python venv, poetry, conda etc), 
set up a new one to install the relevant python packages for the django backend api. 

## Virtual Environment 
I usually do: python -m venv ~/.virtualenvs/<name of virtual environment>
Activate it by: . ~/.virtualenvs/<name of virtual environment>/scripts/activate

## Libraries
via pip install (after activation of your virtual environment)
django
django-cors-headers
django-rest-framework

# Get it running 
`python manage.py runserver `
Go to localhost:8000/admin to look at the schemas (user: breaktime, pass: breaktime123; or you can create your own superuser with `python manage.py createsuperuser`)
localhost:8000/api to look at the api (currently only shift)
