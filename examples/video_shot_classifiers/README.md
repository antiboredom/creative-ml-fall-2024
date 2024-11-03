# Image & Video Classifiers

Here are some notes that go along with my video lecture about using classifiers.

## Virtual Environments

In the video I make use of virtual environments to install the dependencies for the examples. A virtual environment is folder that lets you install python dependencies locally rather than globally in your system. You need to create a virtual environment once, and then activate it every time you want to run your code.

To make a virtual environment:

```bash
python3 -m venv venv
```

To activate:

```
source venv/bin/activate
```

Then you can install what you need for these examples to work:

```
pip install transformers "scenedetect[opencv]" torch pillow moviepy
```

Next time you close your terminal and want to run the examples again you need to re-activate the virtual environment with:

```
source venv/bin/activate
```

## Image Examples

To run the examples, just type `python NAMEOFEXAMPLE.py`.

`python image_caption.py`: this classifies a single image. Edit line 4 to change the image.

`python image_object_detect.py`: this identifies objects and their locations in a single image. Edit line 4 to change the image.

`python image_caption.py`: this writes a caption as a sentence for a single image. Edit line 4 to change the image.

## Video Examples

To run the examples, just type `python NAMEOFEXAMPLE.py`. Each of these examples also has command line arguments you can adjust. To see the arguments, type `python NAMEOFEXAMPLE.py --help`

Each example makes a supercut by taking in a single (or multiple videos), analyzing their content, and then producing a new cut of the video with clips that you specify using the `--search` argument.

You can have them either try to break the video into distinct shots and run the analysis on the first frame of the shot, or set a time increment. If you set a time increment, the first frame of the time span will be used.

Each of the following scripts will also generate a `.json` file containing the contents of the shots. So the first time you run the script it'll make the json file, and subsequent times it'll just use that file rather than re-analyzing everything. If you DO want to re-analyze the video file, just delete the json file.

### `classifier_supercut.py`

NOTE: this was broken in the video I made but should work better now!

This script uses an image classifier to make supercuts.

```bash
python classifier_supercut.py --input SOMEVIDEO.mp4 --search "military" --thresh 0.01 --timeinc 0.5 --output military.mp4
```

This searches for the images that might contain "military" related visuals, with a confidence level of 0.01 (set by `--thresh`), and outputs a file called `military.mp4`. It breaks the video up into 0.5 second chunks (specified by `--timeinc 0.5`).

### `object_supercut.py`

This looks for particular objects in a video. The object list is somewhat limited, but it works really well for identifying scenes with people, cars, and a other objects [listed here](https://huggingface.co/hustvl/yolos-tiny/blob/main/config.json).

```bash
python object_supercut.py --input SOMEVIDEO.mp4 --search "person" --timeinc 0.5 --output people.mp4
```

### `caption_supercut.py`

This one writes a description for frames and then searches through those descriptions to make a supercut.

```bash
python caption_supercut.py --input SOMEVIDEO.mp4 --search "police" --useshots --output police.mp4
```

Here I'm using `--useshots` rather than timeinc to speed things up a bit.
