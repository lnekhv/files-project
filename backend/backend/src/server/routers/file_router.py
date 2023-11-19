from typing import List

from fastapi import APIRouter, UploadFile

from ...server.models.File import FileDTO, FileShortDTO
from ...services.file_service import get_all_files, add_file, get_file_by_id

router = APIRouter(prefix="/files", tags=["Files"])


@router.post("", response_model=FileDTO)
async def upload_file(file: UploadFile):
    return await add_file(file)


@router.get("", response_model=List[FileShortDTO])
async def get_files():
    return get_all_files()


@router.get("/{file_id}", response_model=FileDTO)
async def get_file(file_id: int):
    return get_file_by_id(file_id)
