import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

SID = os.environ["SID"]
AUTH = os.environ["AUTH"]

client = Client(SID , AUTH)

call = client.calls.create(
        url="http://demo.twilio.com/docs/voice.xml",
        to="+919880211405",
        from_="+12184233286",
        )

print(call.sid)
