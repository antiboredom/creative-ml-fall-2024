from PIL import Image
from transformers import pipeline

image = Image.open("horsecops.jpg")

labeler = pipeline(
    "image-classification", model="google/vit-base-patch16-224", device="cpu"
)

results = labeler(image)
print(results)
