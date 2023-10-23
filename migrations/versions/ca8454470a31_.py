"""empty message

Revision ID: ca8454470a31
Revises: 1b287d3a53b3
Create Date: 2023-10-20 17:26:48.988170

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca8454470a31'
down_revision = '1b287d3a53b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('friends', 'profileImage')
    op.add_column('users', sa.Column('profile_image', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_image')
    op.add_column('friends', sa.Column('profileImage', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###