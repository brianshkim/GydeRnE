from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        firstname='demo', 
        lastname="user",
        professor=True,
        school_name= 'App Academy')
    Matilda = User(
        username='MZhangQAQ', 
        email='Matilda@aa.io', 
        password='password', 
        firstname='Matilda', 
        lastname='Zhang',
        professor=False,
        school_name= 'TCNJ')
    Brian = User(
        username='BriantheBrain', 
        email='Brian@aa.io', 
        password='password', 
        firstname='Brian', 
        lastname='Kim',
        professor=False,
        school_name= 'UCLA')

    db.session.add(demo)
    db.session.add(Matilda)
    db.session.add(Brian)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
