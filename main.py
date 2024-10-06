import os
import uuid
from datetime import datetime
from flask import Flask, request, jsonify
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from flask_cors import CORS

app = Flask(__name__)
from test import translate_text_to_pirate_speech

ELEVENLABS_API_KEY = "sk_b190f1cb25c2dfb19d7f1f34b0146f2e4d2717bbb6450e7c"
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

CORS(app)  # Enable CORS for all routes

# Track the last saved audio file
last_file_path = None

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    global last_file_path  # Declare that we'll use the global variable
    
    data = request.json
    text = data.get('text')

    ptext = translate_text_to_pirate_speech(text)
    
    # You may need to replace this with actual pirate text translation logic
    pirate_text = f" {ptext}"  # Placeholder for actual pirate translation logic
    audio_file_path = text_to_speech_file(ptext)

    # Delete the old file if it exists
    if last_file_path and os.path.exists(last_file_path):
        os.remove(last_file_path)

    # Update the last file path to the new file
    last_file_path = audio_file_path
    
    return jsonify({'pirateText': pirate_text, 'audioFilePath': audio_file_path})

@app.route('/list-audio-files', methods=['GET'])
def list_audio_files():
    audio_files = [f for f in os.listdir('.') if f.endswith('.mp3')]
    return jsonify(audio_files)

def text_to_speech_file(text: str) -> str:
    response = client.text_to_speech.convert(
        voice_id="7fbQ7yJuEo56rYjrYaEh",  # John Doe Pirate Voice
        output_format="mp3_22050_32",
        text=text,
        model_id="eleven_turbo_v2_5",
        voice_settings=VoiceSettings(
            stability=0.0,
            similarity_boost=1.0,
            style=0.0,
            use_speaker_boost=True,
        ),
    )
    
    # Create a unique filename using UUID
    unique_id = str(uuid.uuid4())
    save_file_path = f"output_{unique_id}.mp3"
    
    with open(save_file_path, "wb") as f:
        for chunk in response:
            if chunk:
                f.write(chunk)
    
    return save_file_path

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))


# Create text to turn into speech
og_text = (
   "Ahoy matey! Gather 'round and lend me yer ear! Ahoy matey! Gather 'round and lend me yer ear! In the briny deep where the sea dogs roam, a fierce storm brews on the horizon, and the waves be crashin' like thunder! We be settin sail aboard the good ship Sea Serpent, with a crew of scallywags ready for treasure and glory."
)
