from PIL import Image
from transformers import pipeline

image = Image.open("horsecops.jpg")
model = pipeline("object-detection", model="facebook/detr-resnet-50")
results = model(image)
for r in results:
    print(r)
