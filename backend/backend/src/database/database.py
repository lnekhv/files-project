import sys
import warnings

from playhouse.postgres_ext import PostgresqlExtDatabase


class Database:
    def __init__(self) -> None:
        self.is_connected = False
        self.name = "postgres"
        self.host = "files-database"
        self.port = 5432
        self.user = "postgres"
        self.password = "postgres"
        self.db = PostgresqlExtDatabase(database=self.name, user=self.user, password=self.password, host=self.host,
                                        port=self.port, autorollback=True)
        self.connect()

    def connect(self):
        try:
            self.db.connect()
            self.is_connected = True
            print("Database connected succesfully")
        except Exception as e:
            warnings.warn('Cannot connect to the database')
            print(e)
        if not self.is_connected:
            sys.exit(1)

    def stop(self):
        self.is_connected = False
        self.db.close()


db_provider = Database()
