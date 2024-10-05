import openai

response_list = []
client = openai.OpenAI(api_key ='YOUR_KEY_HERE')

completion = client.chat.completions.create(
    
    model = "gpt-3.5-turbo",
    messages = 
    [
        {"role": "system", "content": "You are a mean pirate."},
        {"role": "user", "content": "{user_response}"}
    ]
    
)

completion_message = completion.choices[0].message.content
response_list.append(completion_message)
print(response_list)




