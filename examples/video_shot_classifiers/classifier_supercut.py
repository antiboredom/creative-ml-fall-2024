from scenedetect import ContentDetector, detect
from moviepy.editor import VideoFileClip, concatenate_videoclips
import os
import json
from PIL import Image
from transformers import pipeline

labeler = pipeline("image-classification", model="microsoft/resnet-50", device="cpu")


def split_by_shots(video):
    """returns a shot list and saves the list as a file"""
    shots = []
    scene_list = detect(video, ContentDetector())

    for shot in scene_list:
        item = {
            "start": shot[0].get_seconds(),
            "end": shot[1].get_seconds(),
        }
        shots.append(item)
    return shots


def split_by_time(video, inc=0.5):
    duration = VideoFileClip(video).duration
    chunks = []
    timestamp = 0
    while timestamp <= duration:
        start = timestamp
        end = timestamp + inc
        if end > duration:
            end = duration
        chunks.append({"start": start, "end": end})
        timestamp += inc
    return chunks


def label_scenes(videofile, scenes):
    jsonname = videofile + ".classifier.json"
    if os.path.exists(jsonname):
        with open(jsonname, "r") as infile:
            out = json.load(infile)
        return out
    out = []
    video = VideoFileClip(videofile)
    for scene in scenes:
        start_time = scene["start"]
        end_time = scene["end"]

        # extract a the first frame of the scene
        frame = video.get_frame(start_time)

        # convert the frame into an image
        img = Image.fromarray(frame)

        # get a label from the image
        results = labeler(img)
        # print(results)

        item = {
            "start": start_time,
            "end": end_time,
            "labels": results,
        }
        out.append(item)
    with open(jsonname, "w") as outfile:
        json.dump(out, outfile, indent=2)
    return out


def make_supercut(
    videos,
    search,
    useshots=False,
    timeinc=10,
    thresh=0.7,
    output="supercut.mp4",
):
    clips = []
    for v in videos:
        video = VideoFileClip(v)
        if useshots:
            scenes = split_by_shots(v)
        else:
            scenes = split_by_time(v, timeinc)
        scenes = label_scenes(v, scenes)
        for s in scenes:
            found = False
            for label in s["labels"]:
                if search in label["label"].split(", ") and label["score"] >= thresh:
                    found = True
            if found:
                clips.append(video.subclip(s["start"], s["end"]))
    composition = concatenate_videoclips(clips)
    composition.write_videofile(output)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Create a supercut based on image classification"
    )
    parser.add_argument(
        "--input",
        "-i",
        dest="input",
        nargs="*",
        required=True,
        help="video file or files",
    )
    parser.add_argument("-s", "--search", help="label to search for", required=False)
    parser.add_argument(
        "-o",
        "--output",
        default="supercut.mp4",
        help="output video file name",
        required=False,
    )
    parser.add_argument(
        "--threshold",
        "-t",
        dest="thresh",
        default=0.7,
        type=float,
        help="threshold for selecting label for supercut, between 0 and 1",
    )
    parser.add_argument(
        "--useshots",
        "-us",
        dest="useshots",
        default=False,
        action="store_true",
        help="split video by camera cuts, using the first frame for classification",
    )

    parser.add_argument(
        "--timeinc",
        "-ti",
        dest="timeinc",
        default=0.5,
        type=float,
        help="split video by time increments, using the first frame of each chunk for classification",
    )

    args = parser.parse_args()

    make_supercut(
        videos=args.input,
        thresh=args.thresh,
        timeinc=args.timeinc,
        useshots=args.useshots,
        search=args.search,
        output=args.output,
    )
