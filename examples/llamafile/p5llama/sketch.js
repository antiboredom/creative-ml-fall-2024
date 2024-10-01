let startButton; // create an empty variable to hold the start button
let rec = new p5.SpeechRec('en-US', gotSpeech); // set up speech recognition, in english. when speech is recognized, call the "gotSpeech" function
rec.continuous = true // set speech rec to be continuous, meaning it will continue listening indefinitely  (doesn't always work)

function setup() {
  noCanvas(); // we aren't using canvas in this example
  startButton = createButton("Start") // create the start button, label it "start"
  startButton.mouseClicked(start) // call the "start" function when you click on the button
}

function start() {
  // simple function that just starts speech recognition
  rec.start();
}

async function gotSpeech() {
  // function that gets called when speech is recognized

  let userInput = rec.resultString; // this is the what the user said

  createElement("p", userInput); // create a <p> element and put the users' speech in it

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

  // put the results in a <p> element
  createElement("p", returnedText)
}