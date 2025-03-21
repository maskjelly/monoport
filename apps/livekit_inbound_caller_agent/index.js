import { SipClient } from 'livekit-server-sdk'

const sipClient = new SipClient(process.env.LIVEKIT_URL ,
                                PROCESS.env.LIVEKIT_API_KEY,
                                PROCESS.env.LIVEKIT_API_SECRET);

const numbers = ['+12184233286']

const name = 'CustRep'


const trunkOptions = {
    krispEnabled: true
}

const trunk = spiClient.createSipInboundTrunk(
    name , 
    numbers,
    trunkOptions,
)

console.log(trunk)
