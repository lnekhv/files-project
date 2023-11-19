import base64
import os
from datetime import datetime
from typing import List

from fastapi import UploadFile

from ..database.dals.file_dal import get_all, add, get_by_id
from ..database.models.File import File
from ..server.models.File import FileDTO, FileShortDTO


def get_all_files() -> List[FileShortDTO]:
    try:
        return [FileShortDTO.model_validate(file) for file in get_all()]
    except Exception as e:
        raise Exception("There was an error retrieving the files list")


async def add_file(file: UploadFile) -> FileDTO:
    try:
        file_content = await file.read()
        timestamp = datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
        filename_timestamp = _generate_filename(file, timestamp)
        encoded_content = base64.b64encode(file_content)
        return FileDTO.model_validate(add(filename_timestamp, encoded_content))
    except Exception as e:
        raise Exception("There was an error adding file")


def get_file_by_id(file_id: int) -> FileDTO:
    try:
        return _parse_file(get_by_id(file_id))
    except Exception as e:
        raise Exception("There was an error retrieving the file")


def _parse_file(file_db: File) -> FileDTO:
    short_file = FileShortDTO.model_validate(file_db)
    try:
        data = file_db.data
        original_content = base64.b64decode(data)
        return FileDTO(id=short_file.id, name=short_file.name, data=original_content)
    except Exception as e:
        raise Exception("There was an error parsing the file")


def _generate_filename(file: UploadFile, timestamp: str) -> str:
    file_name, file_extension = os.path.splitext(file.filename)
    return f"{file_name}_{timestamp}{file_extension}"
