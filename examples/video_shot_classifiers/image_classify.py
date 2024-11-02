from PIL import Image
from transformers import pipeline

image = Image.open("/Users/sam/Downloads/signal-2024-10-28-170934_002.jpeg")

labeler = pipeline(
    "image-classification", model="google/vit-base-patch16-224", device="cpu"
)

results = labeler(image)
print(results)
