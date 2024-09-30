Here are two examples of making your own interface for a llamafile. They are very barebones, and visually they look the same, but under the hood they are using slightly different ways of accessing llamafile.

To run them, first start your llamafile in the terminal. Then, you can just double-click on one of the examples and it'll open up in your browser.

Remember, to run a llamafile, open the terminal, then just type:

```bash
./llava-v1.5-7b-q4.llamafile
```

If you are running the mistral llamafile, you'd type:

```bash
./mistral-7b-instruct-v0.2.Q4_0.llamafile
```

## interface_example.html

`interface_example.html` uses an OpenAI-like API. To change how the model responds, edit these lines in the file:

```javascript
const body = JSON.stringify({
    model: "LLaMA_CPP",
    messages: [
        {
            role: "system",
            content: "You are LLAMAfile, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests.",
        },
        {
            role: "user",
            content: document.querySelector("#input-text").value,
        },
    ],
});
```

Here we have an array of two messages. The top sets the system prompt for the llamafile. Edit this to change how the model responds. The bottom message is the user input. It's being pulled from an html element with the id `input-text`. 

---

## interface_example2.html

`interface_example2.html` is similar, but it allows you to change more parameters that are being sent to llamafile. 

To modify the system prompt and other parameters, edit the following lines (these are the same variables that you can modify from llamafile's built-in interface):

```javsacript
const PROMPT = `This is a conversation between User and Llama, a friendly chatbot. Llama is helpful, kind, honest, good at writing, and never fails to answer any requests immediately and with precision.\n\nUser: ${USER_INPUT}\nLlama:`

const body = JSON.stringify({
    "stream": false,
    "n_predict": 400,
    "temperature": 0.7,
    "stop": ["</s>", "Llama:", "User:"],
    "repeat_last_n": 256,
    "repeat_penalty": 1.18,
    "top_k": 40,
    "top_p": 0.95,
    "min_p": 0.05,
    "tfs_z": 1,
    "typical_p": 1,
    "presence_penalty": 0,
    "frequency_penalty": 0,
    "mirostat": 0,
    "mirostat_tau": 5,
    "mirostat_eta": 0.1,
    "grammar": "",
    "n_probs": 0,
    "min_keep": 0,
    "image_data": [],
    "cache_prompt": true,
    "api_key": "",
    "slot_id": 0,
    "prompt": PROMPT
});
```