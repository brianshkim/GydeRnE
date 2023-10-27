from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_education():
    demo = User(
        degree_undergrad=['Math'],
        email='demo@aa.io',
        password='password',
        firstname='demo',
        lastname="user"
        )


    db.session.add(demo)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_education():
    db.session.execute('TRUNCATE education RESTART IDENTITY CASCADE;')
    db.session.commit()
