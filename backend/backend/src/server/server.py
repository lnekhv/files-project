from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from ..server.routers.file_router import router as file_router


class Server:
    def __init__(self):
        self.app = FastAPI()
        self.app.add_middleware(CORSMiddleware,
                                allow_origins=["*"],
                                allow_methods=["*"],
                                allow_headers=["*"])
        self.app.include_router(file_router)


server = Server()
