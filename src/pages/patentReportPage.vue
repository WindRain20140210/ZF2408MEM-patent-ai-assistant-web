
<script setup>

</script>

<template>
  <v-app>
    <PatentReport />
  </v-app>
</template>

<script>
export default {
  name: 'patentReportPage',
}


import { fetchEventSource } from '@microsoft/fetch-event-source';

// const url = 'https://api.dify.ai/v1/chat-messages';
// const apiKey = 'app-TVD5Ms2KWOVnmqZVeI8QBmj2';
// const apiKey = 'app-v08ygzkVa9q7JSA4uCqToITH'; // 李欣欣

const url = 'http://110.42.103.198:23837/v1/chat-messages';
const apiKey = 'app-Agp9QZQWtA8GsB0GdbrPekT3';

const conditions = {
      time: + new Date(),
      industry: '',
      region: '',
      keyWord: '',
      territory: '',
      dataType: 'patent_trend1'
    };
    
    const fetchData = {
        inputs: {
          conditions: JSON.stringify(conditions)
        },
        query: '专利报告分析 生成报告', // 用户对话框中输入的内容
        response_mode: 'streaming', // 'blocking',// 固定传
        conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
        user: 'beihang' // userName.value, // 用户名，区分请求用户
    }

fetchEventSource(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(fetchData),
    // body: JSON.stringify({
    //     "inputs": {},
    //     "query": "玄凤鹦鹉和小黄鸡",
    //     "response_mode": "streaming", 
    //     "conversation_id": "", 
    //     "user": "test"
    // }),
    onmessage(ev) {
        console.log("ev", JSON.parse(ev.data));
      
    }
});

</script>



