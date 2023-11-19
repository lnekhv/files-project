from peewee import *

from ...database.database import db_provider


class File(Model):
    id = AutoField()
    name = CharField(250)
    data = BlobField()

    class Meta:
        database = db_provider.db
        db_table = 'File'
