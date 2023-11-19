from typing import List

from peewee import DoesNotExist

from ...database.models.File import File


def get_by_id(file_id: int = None) -> File:
    try:
        return File.get_by_id(file_id)
    except DoesNotExist:
        raise Exception(f"File {file_id} not found")


def get_all() -> List[File]:
    return File.select().order_by(File.id.asc())


def add(name: str, data: bytes) -> File:
    try:
        return File.create(
            name=name,
            data=data,
        )
    except Exception as e:
        raise Exception("Error during adding file")
