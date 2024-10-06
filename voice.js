
const CAT_IDLE = 'images/normal_cat_idle_big.gif';
const PIRATE_CAT_IDLE = 'images/pirate_cat_idle_big.gif';
const CAT_TALKING = 'images/normal_cat_talk_big.gif'
const PIRATE_CAT_TALKING = 'images/pirate_cat_talk_big.gif'

var recordButton = document.getElementById('recordButton');
var userTextOutputElement = document.getElementById('userTextOutput');
var pirateTextOutputElement = document.getElementById('pirateTextOutput');
var playOriginalVoice = document.getElementById('playButton');
var playPirateVoice = document.getElementById('playAudio');
var audio; // Declare a variable to hold the Audio object
var pAudio;

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
                sendToServer(userTextOutputElement.value);
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
        pirateTextOutputElement.value = data.pirateText; p[[-// Update pirate text output
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

playOriginalVoice.addEventListener('click', () => {
    if (playOriginalVoice.innerHTML === 'Play') { // Change 'Click Me' to your specific text
        play();
    }
    else{
        stop();
    }
});


function play() {
    if (audioBlob) {
        animatedLeftCat();
        playOriginalVoice.innerHTML = 'Stop';
        audio = new Audio(URL.createObjectURL(audioBlob));
        audio.play();

        audio.addEventListener('ended', () => {
            playOriginalVoice.innerHTML = 'Play';
            stopLeftCat();
        });

    } else {
        console.log("Record first!");
    }
}

function stop() {
    playOriginalVoice.innerHTML = 'Play';
    stopLeftCat();
    if (audio) {
        audio.pause(); 
        audio.currentTime = 0; 
    }
}

playPirateVoice.addEventListener('click', () => {
    if (playPirateVoice.innerHTML === 'Play') { // Change 'Click Me' to your specific text
        playPirate();
    }
    else{
        stopPirate();
    }
});

function playPirate() {
    // Implement pirate audio playback functionality if needed
    playPirateVoice.innerHTML = 'Stop';
    animatedRightCat();
    pAudio = new Audio('./output.mp3');
    pAudio.play();

    pAudio.addEventListener('ended', () => {
        playPirateVoice.innerHTML = 'Play';
        stopRightCat();
        pAudio.pause();
    });
}

function stopPirate() {
    playPirateVoice.innerHTML = 'Play';
    stopRightCat();
    if(pAudio) {
        pAudio.pause(); 
        pAudio.currentTime = 0; 
    }
}



function stopLeftCat() {
    document.getElementById('leftCat').src = CAT_IDLE;
}

function stopRightCat() {
    document.getElementById('rightCat').src = PIRATE_CAT_IDLE;
}

function animatedLeftCat() {
    document.getElementById('leftCat').src = CAT_TALKING;
}

function animatedRightCat() {
    document.getElementById('rightCat').src = PIRATE_CAT_TALKING;
}
