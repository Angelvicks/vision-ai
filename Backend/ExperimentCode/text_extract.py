import torch
import torchvision.transforms as transforms
import torch.nn as nn
import numpy as np
from io import BytesIO
from PIL import Image
import os

MODEL_NAME = "model.pth"
model = None
def load_model():
    model = Model(*args, **kwargs)
    model_path = os.path.join('model', MODEL_NAME)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    print("Model Loaded")
    return model

def predictions(image: Image.Image):
    global model
    if model is None: 
        model = load_model()

    image = np.asarray(image.resize((224, 224)))[..., :3]
    image = np.expand_dims(image, 0)
    image = image / 127.5 - 1.0

    result = decode_predictions(model.predict(image), 2)[0]

    response = []
    for i, res in enumerate(result):
        resp = {}
        resp["class"] = res[1]
        resp["confidence"] = f"{res[2]*100:0.2f} %"

        response.append(resp)

    return response



def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image

"""
    bytes_str = io.BytesIO(await file.read())
    try:
        img = Image.open(bytes_str)
    except:
        raise HTTPException(detail="Invalid image", status_code=400)

    print("step 1")
    
    try:
        img.save(getcwd() + f"/images/{file.filename}")
    except FileExistsError:
        pass

    print("step 2")

    # preds = pytesseract.image_to_string(img)
    preds = pytesseract.image_to_string(Image.open(io.BytesIO(await file.read())).convert('RGB'))

    print("step 3")

    predictions = [x for x in preds.split("\n")]
    print(preds)
    print(settings.debug)

    print("step 4")

    # Save to file
    with open(getcwd() + f"/images/{file.filename}.txt", "w") as my_file:
        my_file.write(predictions)
        my_file.save()

    return {
        "results": predictions, 
        "original": preds, 
        "text_link": f"http://127.0.0.1:8000/file/{file.filename}.txt",
        "link": f"http://127.0.0.1:8000/file/{file.filename}"
    }
    """
