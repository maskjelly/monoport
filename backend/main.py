from flask import Flask
from google import genai
from twilio.twiml.voice_response import VoiceResponse
import os
from dotenv import load_dotenv

load_dotenv()

BITCH = os.environ["BITCH"]

app = Flask(__name__)
# client = genai.models('gemini-pro')

@app.route("/answer", methods=['GET', 'POST'])
def answer_call():
    """Respond to incoming phone calls with a brief message."""
    
    client = genai.Client(api_key=BITCH)
    # Starting twiml response
    response = client.models.generate_content(
        model = "gemini-2.0-flash" , contents="You are live on a call with Twitter / X  and i want you to introduce yourself as autocall agent and tell them you are ai generated and created by 'Whiteye' who is also known as aaryan , tell this is all for FREE and barely costing any money because the whole infrastructure is being built by a single guy aka your creator 'aaryan' , and thank everyone for being here")

    resp = VoiceResponse()

    # Access the text correctly
    if response.text:
        resp.say(response.text, voice='Polly.Amy')
    else:
        resp.say("Sorry, I could not generate a joke.", voice='Polly.Amy')

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)