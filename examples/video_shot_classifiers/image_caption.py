from PIL import Image
from transformers import pipeline

img = Image.open("horsecops.jpg")

captioner = pipeline(
    "image-to-text", model="Salesforce/blip-image-captioning-base", device="cpu"
)


results = captioner(img)
print(results)
