from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from test import translate_text_to_pirate_speech

ELEVENLABS_API_KEY = "sk_b190f1cb25c2dfb19d7f1f34b0146f2e4d2717bbb6450e7c"  
client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

def text_to_speech_file(text: str) -> str:
    response = client.text_to_speech.convert(
        voice_id="7fbQ7yJuEo56rYjrYaEh" , # John Doe Pirate Voice  
        output_format="mp3_22050_32", 
        text=text, # Turn text to speech
        model_id="eleven_turbo_v2_5", 
        voice_settings=VoiceSettings(
        stability=0.0,
        similarity_boost=1.0,
        style=0.0,
        use_speaker_boost=True,
            ),
        )
    # Save file as mp3
    save_file_path = f"output.mp3"

    with open(save_file_path, "wb") as f:
        for chunk in response:
            if chunk:
                f.write(chunk)
        return save_file_path

# Create text to turn into speech
#text = (
#    "Ahoy matey! Gather 'round and lend me yer ear! Ahoy matey! Gather 'round and lend me yer ear! In the briny deep where the sea dogs roam, a fierce storm brews on the horizon, and the waves be crashin' like thunder! We be settin sail aboard the good ship Sea Serpent, with a crew of scallywags ready for treasure and glory."
#)

test_text = "testing please work PLEASEEEEEEEE!"
text = translate_text_to_pirate_speech(test_text)
print(text)
text_to_speech_file(text)
