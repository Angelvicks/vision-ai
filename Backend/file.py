from typing import List
import os, pathlib, io
from os import getcwd
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
from PIL import Image
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMAGEDIR = "C:\\Users\\ANGEL\\Desktop\\Text_Extraction\\images"
BASE_DIR = pathlib.Path(__file__).parent
IMG_DIR = BASE_DIR / "images"
img = os.listdir(IMAGEDIR)

@app.get("/start")
async def root():
    return { "Welcome to this Application"}

@app.post("/files/")

async def create_files(files: List[bytes] = File(...)):

    return {"file_sizes": [len(file) for file in files]}


@app.post("/uploadfiles/")

async def create_upload_files(files: List[UploadFile] = File(...)):

    return {"filenames":[file.filename for file in files]}

@app.post("/multiplefiles/")
async def upload_files(files: List[UploadFile] = File(...)):
    
    for file in files:
    
        contents = io.BytesIO(await file.read())
        try:

            img = Image.open(contents)
        except:

            raise HTTPException(detail="Invalid image", status_code=400)

#f"images/{uploaded_file.filename}" || open(f"{IMAGEDIR}{file.filename}", "wb")
        with open(f"{IMAGEDIR}/{file.filename}", "wb") as f:
            f.write(contents)

    return {"filenames":[file.filename for file in files]}

@app.post("/upload-file/")
async def create_upload_file(uploaded_file: UploadFile = File(...)):    
    file_location = f"images/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(uploaded_file.file, file_object)    
    return {
        "info": f"file '{uploaded_file.filename}' saved at '{file_location}'",
        "link": f"http://127.0.0.1:8000/file/{uploaded_file.filename}"
    }


@app.get("/file/{name_file}")
def get_file(name_file: str):
    return FileResponse(path=getcwd() + "/images/" + name_file)


@app.get("/")
async def main():
    content = """
<body>
<form action="/files/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)