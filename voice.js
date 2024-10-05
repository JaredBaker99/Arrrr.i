// Variables to start recording user voice and stop recording
var startRecord = document.getElementById('startRecordButton');
var stopRecord = document.getElementById('stopRecordButton');
var recordButton = document.getElementById('recordButton');
var userTextOutputElement = document.getElementById('userTextOutput'); 

// Variable to play original voice button
var playOriginalVoice = document.getElementById('playButton');

// Variable to play pirate voice
var playPirateVoice = document.getElementById('playPirateVoiceButton');

// Library to recognize speech based on user voice
var voiceRecognition = new webkitSpeechRecognition();
var audioRecord;  
var audioChunks = []; 
var audioBlob;  
var audio; // Declare a variable to hold the Audio object

// Set original language based on user settings 
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
            };
        });
    } else {
        recordButton.innerHTML = 'Record';
        voiceRecognition.stop();
        console.log("Stopped recording user's voice.");
        audioRecord.stop();
    }
}

// Add speech to text
voiceRecognition.addEventListener('result', (event) => {
    let userTextOutput = '';
    for (let i = 0; i < event.results.length; i++) {
        userTextOutput += event.results[i][0].transcript;
    }
    userTextOutputElement.value = userTextOutput;
});

function play() {
    if (playOriginalVoice.innerHTML === 'Play') {
        if (audioBlob) {
            playOriginalVoice.innerHTML = 'Stop';
            audio = new Audio(URL.createObjectURL(audioBlob)); // Use the declared audio variable
            audio.play();
        } else {
            console.log("Record first!");
        }
    } else {
        playOriginalVoice.innerHTML = 'Play';
        if (audio) {
            audio.pause(); // Stop the audio
            audio.currentTime = 0; // Reset to the beginning
        }
    }
}
