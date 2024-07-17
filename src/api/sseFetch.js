import { fetchEventSource } from '@microsoft/fetch-event-source';

const sseFetch = (fetchData, callback) => {
    const url = 'http://110.42.103.198:23837/v1/chat-messages';
    const apiKey = 'app-K2JCwC36gS4UYILFfw60w256';

const ctrl = new AbortController();

let content = ''; // 文案内容
let temp = ''; // 存储json数据过桥
let jsonData = null; // 图表json

fetchEventSource(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
  },
  body: JSON.stringify(fetchData),
  signal: ctrl.signal,
  openWhenHidden: true,
  async onopen(response) {
    console.log('onopen',response);
  },
  onmessage(msg) {
    try {
      const data = JSON.parse(msg.data);
      console.log(data, 'msg =========')
      

      if (data.event === "message") {
          
          if(data.answer.indexOf('@') > -1  && temp.indexOf('@@@DataType') < 0 ) {
            
            let str = data.answer;
            let splitIndex = str.indexOf("@"); 
            let firstPart = str.slice(0, splitIndex);
            let secondPart = str.slice(splitIndex);

            temp += secondPart;
            content += firstPart;
          } 

          if(temp.indexOf('@') > -1) {
            temp += data.answer;
          } else {
            content += data.answer;
          }

          if(temp.indexOf('@@@DataType') > -1 && temp.indexOf('@@@End') > -1) {
            console.log(temp, 'temp -------')

            let jsonString = temp.match(/{[\s\S]*}/)[0]; // 使用正则表达式提取 JSON 部分
            // let jsonString = extractJSON(temp);
            jsonData = JSON.parse(jsonString); // 将 JSON 字符串转换为对象
          }
          callback && callback(content, jsonData);
      }
      if(data.event === "message_end") {
        ctrl.abort();
      }
    } catch (error) {
      console.log(error);
    }

  },
  onclose() {
    console.log('onclose');
  },
  onerror(err) {
    console.log('onerror', err);
    // ctrl.abort();
    throw err;
  }
});

    // fetchEventSource(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${apiKey}`,
    //     },
    //     openWhenHidden: true,
    //     body: JSON.stringify(fetchData),
    //     onmessage(msg) {

    //         const data = JSON.parse(msg.data);
    //         console.log(data, 'msg =========')

    //         if (data.event === 'message') {
    //             callback && callback(data);
    //         }
    //     }
    // });
}
 
function extractJSON(str) {
  const regex = /@@@DataType:[^\s]+\s*(\{.*?\}|\[.*?\])\s*@@@End\s+temp/;
  const match = str.match(regex);
  if (match && match[1]) {
      return JSON.parse(match[1]);
  }
  return null;
}
export default sseFetch;
