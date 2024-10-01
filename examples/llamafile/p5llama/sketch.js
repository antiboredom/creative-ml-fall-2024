let startButton;
let rec = new p5.SpeechRec('en-US', gotSpeech);
rec.continuous = true

function setup() {
  noCanvas();
  background(255);
  startButton = createButton("Start")
  startButton.mouseClicked(start)
}

function start() {
  rec.start();
}

async function gotSpeech() {
  let userInput = rec.resultString;

  createElement("p", userInput)

  const URL = "http://localhost:8080/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer no-key",
  };

  const method = "POST";

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

  const response = await fetch(URL, {
    method,
    headers,
    body,
  });

  const results = await response.json();

  const returnedText = results.choices[0].message.content;

  createElement("p", returnedText)
}