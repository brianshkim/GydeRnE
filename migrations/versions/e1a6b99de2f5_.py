"""empty message

Revision ID: e1a6b99de2f5
Revises: 88fb4cfb849b
Create Date: 2023-11-15 00:58:05.987875

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1a6b99de2f5'
down_revision = '88fb4cfb849b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chapters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=600), nullable=True),
    sa.Column('course_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('posts', sa.Column('chapter_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'posts', 'chapters', ['chapter_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.drop_column('posts', 'chapter_id')
    op.drop_table('chapters')
    # ### end Alembic commands ###
