import openai

response_list = []
client = openai.OpenAI(api_key ='YOUR_API_KEY')

# Function to generate responses from OpenAI
def get_chatbot_response(user_response: str) -> str:
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a mean pirate."},
            {"role": "user", "content": user_response}
        ]
    )
    return completion.choices[0].message.content