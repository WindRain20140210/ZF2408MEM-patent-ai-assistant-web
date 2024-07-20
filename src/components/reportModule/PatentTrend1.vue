<template>
    <div class="wrap">
      <p class="title">技术背景和目标</p>
      <p class="content">{{ content }}</p>
    </div>
    <div ref="echartsRef" :style="{ width: '100%', height: '400px' }"></div>
</template>
  
<script setup>
import { defineProps, watch, ref } from 'vue';
import * as echarts from "echarts";
import sseFetch from '/src/api/sseFetch';

const props = defineProps({
  message: Object,
  detailData: Object
})
const content = ref('');
const echartsRef = ref(null);
let chartInstance = null;
const message = ref(props.message);


const initChart = (xAxisData, seriesData) => {
    const option  = {
    xAxis: {
        type: 'category',
        data: xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: seriesData,
        type: 'bar'
        }
    ]
    };

    chartInstance = echarts.init(echartsRef.value);
    chartInstance.setOption(option);
};


function renderPage(res_content, jsonData) {
  content.value = res_content;
  
  if (jsonData) {
    let grouped = {};
    jsonData.data.forEach(item => {
      for (let key in item) {
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(item[key]);
      }
    });

    initChart(grouped.year, grouped.num);
  }
}

function sseRenderPage() {
  if(!message.value) return false;
  const { industry, area, key, applicant } = JSON.parse(message.value);

  const conditions = {
      time: + new Date(),
      industry,
      area,
      key,
      theme: '',
      dataType: 'patent_trend1',
      applicant,
  };

  const fetchData = {
      inputs: {
          conditions: JSON.stringify(conditions)
      },
      query: '生成印刷行业分析报告', // 用户对话框中输入的内容
      response_mode: 'streaming', // 'blocking',// 固定传
      conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
      user: 'liruinan' // userName.value, // 用户名，区分请求用户
  }

  sseFetch(fetchData, (res_content, jsonData) => {
      renderPage(res_content, jsonData)
  });

}
sseRenderPage();
 
watch(
    () => props.detailData,
    (newValue)=> {
      if(newValue) {
        const res_content = newValue.content
        const jsonData = JSON.parse(newValue.data);
        renderPage(res_content, jsonData)
      }
    },
);
</script>
<style>
.wrap {
  padding: 20px!important;
}
.title {
  font-weight: bold;
  color: #333333;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
}
.content {
  color: #666666;
  font-size: 14px;
  line-height: 30px;
  text-indent: 2em;
}
</style>