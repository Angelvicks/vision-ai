from functools import lru_cache
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi import responses
from fastapi.responses import FileResponse, JSONResponse
from typing import List, Optional
import pytesseract
import pathlib
from os import getcwd
import os
import io
import uuid
import shutil
from PIL import Image
import sys
import logging
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseSettings, BaseModel
from random import randint

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

pytesseract.pytesseract.tesseract_cmd ='C:\\Program Files\\Tesseract-OCR\\tesseract.exe'


BASE_DIR = pathlib.Path(__file__).parent
UPLOAD_DIR = BASE_DIR / "uploads"

class Settings(BaseSettings):
    debug: bool = False
    echo_active: bool = False

    class Config:
        env_file = ".env"

class PredictionResponse(BaseModel):
    filename: str
    contentype: Optional[str] = None 
    likely_class: Optional[str] = None

@lru_cache
def get_settings():
    return Settings()

settings = get_settings()
DEBUG = settings.debug

print(DEBUG)

@app.post("/upload", response_class=FileResponse, responses={200: {"Description": "Uploading Images"}})
async def upload_file(file: UploadFile = File(...), settings: Settings=Depends(get_settings)):
    if not settings.echo_active:
        raise HTTPException(detail="Invalid endpoint", status_code=400)
    UPLOAD_DIR.mkdir(exist_ok=True)
    bytes_str = io.BytesIO(await file.read())
    #img = Image.open(bytes_str) #opencv can be used here, also called cv2
    try:
        img = Image.open(bytes_str)
    except:
        raise HTTPException(detail="Invalid image", status_code=400)
    fname = pathlib.Path(file.filename)
    fext = fname.suffix # .jpg, .txt
    dest = UPLOAD_DIR / f"{file.filename}"
    # {uuid.uuid1()}{fext}
    with open(str(dest), 'wb') as out:
        out.write(bytes_str.read())
    img.save(dest)
    print(settings.debug)
    return dest

@app.post("/predictions") # http POST
async def prediction_view(file:UploadFile = File(...), settings:Settings = Depends(get_settings)):
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')

        predicted_class = pytesseract.image_to_string(image)
        predictions = [x for x in predicted_class.split("\n")]
        
        logging.info(f"Predicted Class: {predictions}")

        # --

        bytes_str = io.BytesIO(contents)
        try:
            img = Image.open(bytes_str)
        except:
            raise HTTPException(detail="Invalid image", status_code=400)
        
        try:
            img.save(getcwd() + f"/images/{file.filename}")
        except FileExistsError:
            pass

        # --

        # Save to file
        
        try:
            my_file_location = getcwd() + f"/images/{file.filename}.txt"
            my_file = open(my_file_location, "w")

            print("begin write")

            for text in predictions:
                my_file.write(f"{str(text)}\n")

            print("END WRITE")
            my_file.close()
            print("close success")

        except Exception as e:
            print("error", e)
        
        # ---


        return {
            "filename": file.filename, 
            "contentype": file.content_type,            
            "likely_class": predictions,
            "text_link": f"http://127.0.0.1:8000/file/{file.filename}.txt",
            "link": f"http://127.0.0.1:8000/file/{file.filename}"
        }
    except Exception as error:
        logging.exception(error)
        e = sys.exc_info()[1]
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict/",  response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):    
   # if file.content_type.startswith('/images/') is False:
      #  raise HTTPException(status_code=400, detail=f'File \'{file.filename}\' is not an image.')    

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')

        predicted_class = pytesseract.image_to_string(image)
        predictions = [x for x in predicted_class.split("\n")]
        
        logging.info(f"Predicted Class: {predictions}")
        return {
            "filename": file.filename, 
            "contentype": file.content_type,            
            "likely_class": predicted_class,
        }
    except Exception as error:
        logging.exception(error)
        e = sys.exc_info()[1]
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/uploads")
async def upload_files(file: UploadFile = File(...)):
    with open(file.filename, 'wb') as image:
        content = await file.read()
        image.write(content)
        image.close()
    return JSONResponse(content={"filename": file.filename},
status_code=200)

@app.post("/img")
async def upload_img(files: List[UploadFile] = File(...)):
   # UPLOAD_DIR.mkdir(exist_ok=True)
    for img in files:
        with open(f'{img.filename}', "wb") as buffer:
            shutil.copyfileobj(img.file, buffer)

        return {"file_name" : "Images Uploaded"}

@app.post("/upload-file/")
async def create_upload_file(uploaded_file: UploadFile = File(...)):
    print("execute")

    file_location = f"images/{uploaded_file.filename}"
    with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(uploaded_file.file, file_object)    
    return {"info": f"file '{uploaded_file.filename}' saved at '{file_location}'",
    "link": f"http://127.0.0.1:8000/file/{uploaded_file.filename}" }

@app.get("/images/")
async def read_random_file():

    # get a random file from the image directory
    files = os.listdir(UPLOAD_DIR)
    random_index = randint(0, len(files) - 1)

    path = f"{UPLOAD_DIR}{files[random_index]}"
    
    # notice you can use FileResponse now because it expects a path
    return FileResponse(path)

@app.get("/file/{name_file}")
def get_file(name_file: str):
    return FileResponse(path=getcwd() + "/images/" + name_file)


"""
@app.post("/test/")
async def get_file(uploaded_file: UploadFile = File(...)):
    print("receive", uploaded_file.filename)
    return JSONResponse({"state": "success"})
"""
