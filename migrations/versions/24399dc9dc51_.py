"""empty message

Revision ID: 24399dc9dc51
Revises: 3e41721a0a95
Create Date: 2023-11-14 19:41:30.235566

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24399dc9dc51'
down_revision = '3e41721a0a95'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('problems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_column('assignments', 'content')
    op.add_column('solutions', sa.Column('problem_id', sa.Integer(), nullable=True))
    op.drop_constraint('solutions_assignment_id_fkey', 'solutions', type_='foreignkey')
    op.create_foreign_key(None, 'solutions', 'problems', ['problem_id'], ['id'])
    op.drop_column('solutions', 'assignment_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('solutions', sa.Column('assignment_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'solutions', type_='foreignkey')
    op.create_foreign_key('solutions_assignment_id_fkey', 'solutions', 'assignments', ['assignment_id'], ['id'])
    op.drop_column('solutions', 'problem_id')
    op.add_column('assignments', sa.Column('content', sa.TEXT(), autoincrement=False, nullable=True))
    op.drop_table('problems')
    # ### end Alembic commands ###