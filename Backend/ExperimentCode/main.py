from typing import List, Optional
import os, pathlib, io
from pydantic import BaseModel
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

class Image(BaseModel):
    name: str
    description: Optional[str] = None
    size: int
    path: Optional[str] = None

@app.get("/start")
async def root():
    return { "Welcome to this Application"}

