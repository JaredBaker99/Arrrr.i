var recordButton = document.getElementById('recordButton');
var userTextOutputElement = document.getElementById('userTextOutput');
var pirateTextOutputElement = document.getElementById('pirateTextOutput');
var audio; // Declare a variable to hold the Audio object

var voiceRecognition = new webkitSpeechRecognition();
var audioRecord;  
var audioChunks = []; 
var audioBlob;  

voiceRecognition.lang = window.navigator.language;
voiceRecognition.interimResults = true;

function record() {
    if (recordButton.innerHTML === 'Record') {
        recordButton.innerHTML = 'Stop Record';
        voiceRecognition.start();
        console.log("Started recording user's voice");
    
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            audioRecord = new MediaRecorder(stream);
            audioRecord.start();
    
            audioRecord.ondataavailable = (event) => {
                audioChunks.push(event.data);  
            };
    
            audioRecord.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioChunks = [];  
                console.log(userTextOutputElement.value);
            };
        });
    } else {
        recordButton.innerHTML = 'Record';
        voiceRecognition.stop();
        console.log("Stopped recording user's voice.");
        audioRecord.stop();
    }
}

voiceRecognition.addEventListener('result', (event) => {
    let userTextOutput = '';
    for (let i = 0; i < event.results.length; i++) {
        userTextOutput += event.results[i][0].transcript;
    }
    userTextOutputElement.value = userTextOutput;
    
    // Send text to the server for conversion to pirate speech
    sendToServer(userTextOutput);
});

function sendToServer(text) {
    fetch('http://localhost:5000/speech-to-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        pirateTextOutputElement.value = data.pirateText; // Update pirate text output
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function play() {
    if (playOriginalVoice.innerHTML === 'Play') {
        if (audioBlob) {
            playOriginalVoice.innerHTML = 'Stop';
            audio = new Audio(URL.createObjectURL(audioBlob));
            audio.play();
        } else {
            console.log("Record first!");
        }
    } else {
        playOriginalVoice.innerHTML = 'Play';
        if (audio) {
            audio.pause(); 
            audio.currentTime = 0; 
        }
    }
}

function playPirate() {
    // Implement pirate audio playback functionality if needed
}
