from moviepy.editor import VideoFileClip
from PIL import Image
from transformers import pipeline

# searches through a video and extracts images of particular objects

# the label we are looking for
LABEL = "human hand"
CANDIDATE_LABELS = ["human eye", "human hand", "human face"]

THRESH = 0.01

# run the code only ever X frames (5 by default)
SKIP = 5

MODEL = "google/owlvit-base-patch32"
pipe = pipeline(model=MODEL, task="zero-shot-object-detection", device="mps")


def save_images(
    videofile, search=LABEL, candidate_labels=CANDIDATE_LABELS, thresh=THRESH
):
    clip = VideoFileClip(videofile)
    index = 0
    frame_no = 0

    for frame in clip.iter_frames():
        frame_no += 1
        if frame_no % SKIP != 0:
            continue

        print("Detecting objects in frame", frame_no)

        image = Image.fromarray(frame)

        results = pipe(image, candidate_labels=CANDIDATE_LABELS)

        for r in results:
            if r["label"] == search and r["score"] >= thresh:
                box = r["box"]
                clipped = image.crop(
                    (box["xmin"], box["ymin"], box["xmax"], box["ymax"])
                )
                clipped.save(f"{videofile}_{search}_{str(index).zfill(4)}.jpg")
                index += 1


if __name__ == "__main__":
    import sys

    for f in sys.argv[1:]:
        save_images(f, LABEL, CANDIDATE_LABELS)
