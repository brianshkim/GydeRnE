from app.models import db, Course

def seed_courses():
    course1 = Course(
        professor_id=3,
        title="Multivariable Calculus",
        subject="Calculus",



        )


    db.session.add(course1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_courses():
    db.session.execute('TRUNCATE courses RESTART IDENTITY CASCADE;')
    db.session.commit()
