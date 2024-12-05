import json
from urllib import request, parse

# change server to the url for the machine you want to work on
SERVER = "http://hype1:8188"

# change WORKFLOW_NAME to the name of the workflow file you want to run
WORKFLOW_NAME = "workfow_example.json"

# this just loads the workflow file
with open(WORKFLOW_NAME, "r") as f:
    prompt = json.load(f)


# this function sends the prompt to the server
# the function will queue a new job! It may take a bit to actually run
def queue_prompt(prompt):
    p = {"prompt": prompt}
    data = json.dumps(p).encode("utf-8")
    req = request.Request(parse.urljoin(SERVER, "/prompt"), data=data)
    request.urlopen(req)


# the following lines make changes to the workflow.
# ALERT: if you aren't using the default workflow, you may need to adjust the numbers!
# to find the right numbers, look at the workflow file you are using.

# this changes the positive prompt in the default workflow.
prompt["6"]["inputs"]["text"] = "a dog surfing"

# this changes the output filename prefix
prompt["9"]["inputs"]["filename_prefix"] = "SAM"

# sets the seed for our KSampler node
prompt["3"]["inputs"]["seed"] = 5


queue_prompt(prompt)
