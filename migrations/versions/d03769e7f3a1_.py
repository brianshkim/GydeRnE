"""empty message

Revision ID: d03769e7f3a1
Revises: 24399dc9dc51
Create Date: 2023-11-14 20:02:59.554429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd03769e7f3a1'
down_revision = '24399dc9dc51'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('problems', sa.Column('assignment_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'problems', 'assignments', ['assignment_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'problems', type_='foreignkey')
    op.drop_column('problems', 'assignment_id')
    # ### end Alembic commands ###
