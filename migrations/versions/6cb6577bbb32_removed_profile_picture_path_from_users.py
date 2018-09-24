"""Removed profile picture path from Users

Revision ID: 6cb6577bbb32
Revises: 639e1b4d8b3d
Create Date: 2018-09-24 20:38:15.793133

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cb6577bbb32'
down_revision = '639e1b4d8b3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_picture_path')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_picture_path', sa.VARCHAR(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
