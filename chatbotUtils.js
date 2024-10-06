var userTextOutputElement = document.getElementById('userTextOutput');
var pirateTextOutputElement = document.getElementById('pirateTextOutput');

function sendMessage(text) {
    const userMessage = userTextOutputElement.value;

    if (userMessage !== "") {
        sendToServer(userMessage)
    }
}

function sendToServer(text) {
    console.log(text);
    fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        pirateTextOutputElement.value = data.chatbot_response; // Update pirate text output
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}