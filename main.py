import openai
from flask import Flask, request, jsonify
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from test import translate_text_to_pirate_speech
from flask_cors import CORS
import os

app = Flask(__name__)

# Initialize OpenAI and Eleven Labs clients
OPENAI_API_KEY = os.getenv("openai_key")
ELEVENLABS_API_KEY = "sk_b190f1cb25c2dfb19d7f1f34b0146f2e4d2717bbb6450e7c"
openai.api_key = OPENAI_API_KEY
elevenlabs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

CORS(app)

@app.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    data = request.json
    text = data.get('text')

    ptext = translate_text_to_pirate_speech(text)
    
    
    # You may need to replace this with actual pirate text translation logic
    pirate_text = f" {ptext}"  # Placeholder for actual pirate translation logic
    audio_file_path = text_to_speech_file(ptext)
    

    return jsonify({'pirateText': pirate_text, 'audioFilePath': audio_file_path})


@app.route('/chatbot', methods=['POST'])
def talk_to_chatbot():
    data = request.json  # Get JSON data from the request
    text = data.get('text')

    if text is None:
        return jsonify({'error': 'Invalid input'}), 400  # Handle missing input

    # Get chatbot response
    chatbot_response = get_chatbot_response(text)

    # Convert the response to pirate speech
    pirate_response = translate_text_to_pirate_speech(chatbot_response)

    # Generate speech from the pirate response
    text_to_speech_file(pirate_response)
    
    return jsonify({'chatbot_response': pirate_response})


def text_to_speech_file(text: str) -> str:
    response = elevenlabs_client.text_to_speech.convert(
        voice_id="7fbQ7yJuEo56rYjrYaEh",  # John Doe Pirate Voice  
        output_format="mp3_22050_32", 
        text=text,  # Turn text to speech
        model_id="eleven_turbo_v2_5", 
        voice_settings=VoiceSettings(
            stability=0.0,
            similarity_boost=1.0,
            style=0.0,
            use_speaker_boost=True,
        ),
    )
    
    # Save file as mp3
    save_file_path = "output.mp3"
    with open(save_file_path, "wb") as f:
        for chunk in response:
            if chunk:
                f.write(chunk)
    
    return save_file_path

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
