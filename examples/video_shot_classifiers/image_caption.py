from PIL import Image
from transformers import pipeline

captioner = pipeline(
    "image-to-text", model="Salesforce/blip-image-captioning-base", device="cpu"
)

img = Image.open("horsecops.jpg")

results = captioner(img)
print(results)
