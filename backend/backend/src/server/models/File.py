from pydantic import BaseModel


class FileShortDTO(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class FileDTO(BaseModel):
    id: int
    name: str
    data: bytes

    class Config:
        from_attributes = True
