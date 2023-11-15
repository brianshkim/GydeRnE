from app.models import db, Solution


# Adds a demo user, you can add other users here if you want
def seed_solutions():
    solution1=Solution(
    content = "latex goes here",
    problem_id=1,
    user_id=3,
    )


    db.session.add(solution1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_solutions():
    db.session.execute('TRUNCATE education RESTART IDENTITY CASCADE;')
    db.session.commit()
