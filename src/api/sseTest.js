import { fetchEventSource } from '@microsoft/fetch-event-source';

const url = 'https://api.dify.ai/v1/chat-messages';
const apiKey = 'app-TVD5Ms2KWOVnmqZVeI8QBmj2';

fetchEventSource(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,

    },
    body: JSON.stringify({
        "inputs": {},
        "query": "玄凤鹦鹉和小黄鸡",
        "response_mode": "streaming", 
        "conversation_id": "", 
        "user": "test"
    }),
    onmessage(ev) {
        console.log("ev", JSON.parse(ev.data));
      
    }
});