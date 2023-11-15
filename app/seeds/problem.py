from app.models import db, Problem


# Adds a demo user, you can add other users here if you want
def seed_problems():
    problem1=Problem(
    content='(a) Check that the graph of the function \(\y = x^2\)',
    assignment_id=1
    )


    db.session.add(problem1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_problems():
    db.session.execute('TRUNCATE education RESTART IDENTITY CASCADE;')
    db.session.commit()
