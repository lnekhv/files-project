import uvicorn as uvicorn

from src.server.server import Server


class Main:
    def __init__(self):
        self.server = Server()


if __name__ == "__main__":
    main = Main()
    uvicorn.run(main.server.app, host='0.0.0.0', port=8000)
