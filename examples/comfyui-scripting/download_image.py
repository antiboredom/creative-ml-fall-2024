import websocket  # NOTE: websocket-client (https://github.com/websocket-client/websocket-client)
import uuid
import json
import urllib.request
import urllib.parse


# change server to the url for the machine you want to work on
SERVER = "hype2:8188"

# change WORKFLOW_NAME to the name of the workflow file you want to run
WORKFLOW_NAME = "workfow_example.json"

# leave this alone
client_id = str(uuid.uuid4())

# this just loads the workflow file
with open(WORKFLOW_NAME, "r") as f:
    prompt = json.load(f)


def queue_prompt(prompt):
    p = {"prompt": prompt, "client_id": client_id}
    data = json.dumps(p).encode("utf-8")
    req = urllib.request.Request("http://{}/prompt".format(SERVER), data=data)
    return json.loads(urllib.request.urlopen(req).read())


def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    url_values = urllib.parse.urlencode(data)
    urllib.request.urlretrieve("http://{}/view?{}".format(SERVER, url_values), filename)


def get_history(prompt_id):
    with urllib.request.urlopen(
        "http://{}/history/{}".format(SERVER, prompt_id)
    ) as response:
        return json.loads(response.read())


def get_images(ws, prompt):
    prompt_id = queue_prompt(prompt)["prompt_id"]
    while True:
        out = ws.recv()
        if isinstance(out, str):
            message = json.loads(out)
            if message["type"] == "executing":
                data = message["data"]
                if data["node"] is None and data["prompt_id"] == prompt_id:
                    break  # Execution is done
        else:
            continue  # previews are binary data

    history = get_history(prompt_id)[prompt_id]
    for node_id in history["outputs"]:
        node_output = history["outputs"][node_id]
        if "images" in node_output:
            for image in node_output["images"]:
                get_image(image["filename"], image["subfolder"], image["type"])


# connect to the comfyui server
ws = websocket.WebSocket()
ws.connect("ws://{}/ws?clientId={}".format(SERVER, client_id))

# create a list of text prompts
texts = ["communism", "capitalism", "anarchism"]

# create and download an image for each of the prompts
for text in texts:
    # set the text prompt for our positive CLIPTextEncode
    prompt["6"]["inputs"]["text"] = text

    # set the seed for our KSampler node
    prompt["3"]["inputs"]["seed"] = 5

    get_images(ws, prompt)

ws.close()
