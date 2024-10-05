// Variables to start recording user voice and stop recording
var startRecord = document.getElementById('startRecordButton');
var stopRecord = document.getElementById('stopRecordButton');
var recordButton = document.getElementById('record');
var play = document.getElementById('play');
var userTextOutputElement = document.getElementById('userTextOutput'); 

// Variable to play original voice button
var playOriginalVoice = document.getElementById('playUserVoiceButton');

// Variable to play pirate voice
var playPirateVoice = document.getElementById('playPirateVoiceButton');

// Library to recognize speech based on user voice
var voiceRecognition = new webkitSpeechRecognition();
var audioRecord;  
var audioChunks = []; 
var audioBlob;  

// Set original language based on user settings 
voiceRecognition.lang = window.navigator.language;
voiceRecognition.interimResults = true;

// // Add event listener to start recording
// startRecord.addEventListener('click', () => {
//     voiceRecognition.start();
//     console.log("Started recording user's voice");

//     navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
//         audioRecord = new MediaRecorder(stream);
//         audioRecord.start();

//         audioRecord.ondataavailable = (event) => {
//             audioChunks.push(event.data);  
//         };

//         audioRecord.onstop = () => {
//             audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//             audioChunks = [];  
//         };
//     });
// });

function record()
{
    if(recordButton.innerHTML === 'Record')
    {
        recordButton.innerHTML = 'Stop Record';
        voiceRecognition.start();
        console.log("Started recording user's voice");
    
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
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
    }
    else
    {
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

// stopRecord.addEventListener('click', () => {
//     voiceRecognition.stop();
//     console.log("Stopped recording user's voice.");
//     audioRecord.stop();
// });

playOriginalVoice.addEventListener('click', () => {
    if (audioBlob) {
        var audio = new Audio(URL.createObjectURL(audioBlob));
        audio.play();
    } else {
        console.log("Record first!")
    }
});
