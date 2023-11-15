from app.models import db, Assignment


# Adds a demo user, you can add other users here if you want
def seed_assignments():
    assignment1=Assignment(
    title='Curves Defined by Paratmetric Equations',
    course=1,
    total_score=30,
    active=True
    )






    db.session.add(assignment1)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_assignments():
    db.session.execute('TRUNCATE education RESTART IDENTITY CASCADE;')
    db.session.commit()
