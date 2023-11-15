from flask.cli import AppGroup
from .users import seed_users, undo_users
from .course import seed_courses, undo_courses
from .assignment import seed_assignments, undo_assignments
from .problem import seed_problems, undo_problems
from .solution import seed_solutions, undo_solutions

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_courses()
    seed_assignments()
    seed_problems()
    seed_solutions()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_courses()
    undo_assignments()
    undo_problems()
    undo_solutions()
    # Add other undo functions here
