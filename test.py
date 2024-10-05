import requests

token='ttsm_b7862b8ecfa64e1b9be450616248eb12-0595ce9afe4f4a348d585169672edc40'
#text = "I'm surprised there is more than one"
#ENDPOINT = f"https://pirate.monkeyness.com/api/translate?english=Hello"
tts = '9af5e3d0-b4b2-44eb-9580-849d8d36a30e'

headers = {
    'Authorization': token
}



def translate_text_to_pirate_speech(text):

    ENDPOINT = f"https://pirate.monkeyness.com/api/translate?english={text}"

    response = requests.get(url=ENDPOINT)
    
    return response.text

#test = translate_text_to_pirate_speech("Hello my friends, we are at the hackaton and we are going to win this competition!!!!")
#print(test)