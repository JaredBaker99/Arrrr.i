from flask import Flask, request, jsonify
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from flask_cors import CORS

app = Flask(__name__)

ELEVENLABS_API_KEY = "YOUR_API_KEY"
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

CORS(app)  # Enable CORS for all routes

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    data = request.json
    text = data.get('text')
    
    # You may need to replace this with actual pirate text translation logic
    pirate_text = f"Arrr! You said: {text}"  # Placeholder for actual pirate translation logic
    audio_file_path = text_to_speech_file(pirate_text)

    return jsonify({'pirateText': pirate_text, 'audioFilePath': audio_file_path})

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
    save_file_path = "output.mp3"
    with open(save_file_path, "wb") as f:
        for chunk in response:
            if chunk:
                f.write(chunk)
    return save_file_path

if __name__ == '__main__':
    app.run(debug=True)
