FROM python:3.9-slim
WORKDIR /backend
ADD requirements.txt .
RUN pip install -r requirements.txt
COPY main.py ./
COPY src src
EXPOSE 8000
CMD ["python","main.py"]