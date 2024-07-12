import { fetchEventSource, EventStreamContentType } from '@microsoft/fetch-event-source';
import { ref } from 'vue';

const sseFetch =  async (fetchData2) => {

    class RetriableError extends Error { }
    class FatalError extends Error { }
    // const url = 'http://110.42.103.198:23837/v1/chat-messages';
    const url = 'https://api.dify.ai/v1/chat-messages';
    // const url = '';
    // const apiKey = ref('app-Agp9QZQWtA8GsB0GdbrPekT3')
    const apiKey = ref('app-TVD5Ms2KWOVnmqZVeI8QBmj2')

    // const apiKey = 'app-v08ygzkVa9q7JSA4uCqToITH'; // 李欣欣

    const headers = {
        'Authorization': `Bearer ${apiKey.value}`,
        'Content-Type': 'application/json'
    }

    let fetchData1 = {
        inputs: {
            "conditions":
            "{\"time\":\"\",\"industry\":\"\",\"keyWord\":\"\",\"r	egion\":\"\",\"territory\":\"\",\"dataType\":\"patentC	ount\"}"
    }, // 参数变量
        query: '专利报告分析', // 用户对话框中输入的内容
        response_mode: 'streaming', // 'blocking',// 固定传
        conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
        user: 'test' // userName.value, // 用户名，区分请求用户
    }

    let fetchData = {
        "inputs": {},
        "query": "玄凤鹦鹉和小黄鸡",
        "response_mode": "streaming", 
        "conversation_id": "", 
        "user": "test"
    }

    console.log('1111111111111000000000000000000001111111111111111111111111');

    await fetchEventSource(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(fetchData),
        openWhenHidden: true,
        async onopen(response) {
            console.log(response, '=========== onopen ==========');
            
            if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
                return; // everything's good
            } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                // client-side errors are usually non-retriable:
                throw new FatalError();
            } else {
                throw new RetriableError();
            }
        },
        onmessage(msg) {
            console.log(msg, '=========== onmessage ==========');
            // if the server emits an error message, throw an exception
            // so it gets handled by the onerror callback below:
            if (msg.event === 'FatalError') {
                throw new FatalError(msg.data);
            }
        },
        onclose() {
            console.log('=========== onclose ==========');

            // if the server closes the connection unexpectedly, retry:
            throw new RetriableError();
        },
        onerror(err) {
            if (err instanceof FatalError) {
                throw err; // rethrow to stop the operation
            } else {
                // do nothing to automatically retry. You can also
                // return a specific retry interval here.
            }
        }
    });

}

export default sseFetch;