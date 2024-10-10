let speaker = new p5.Speech(); // speech synthesis object
speaker.interrupt = true;

function setup() {
  createCanvas(400, 400);
  sendToLlama("How are you?")
}

function draw() {
  background(220);
}

async function sendToLlama(userInput) {
  const URL = "http://localhost:8080/v1/chat/completions"; // url for our llamafile

  // required headers to set on the http request to llamafile
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer no-key",
  };

  // this says make a "POST" request to llamafile
  const method = "POST";

  // the data we are sending to llamafile
  const body = JSON.stringify({
    model: "LLaMA_CPP",
    messages: [
      {
        role: "system",
        content:
          "You are ContraryBot. You reply with the opposite of what User writes.",
      },
      {
        role: "user",
        content: userInput
      },
    ],
  });

  // send to llamafile!
  const response = await fetch(URL, {
    method,
    headers,
    body,
  });

  // get the llm results
  const results = await response.json();
  const returnedText = results.choices[0].message.content;
  speaker.speak(returnedText)
}