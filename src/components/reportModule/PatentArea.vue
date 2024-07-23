<template>
  <div class="wrap" :id=chartId>
    <p class="title">地域分析 {{chartId}}</p>
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
  detailData: Object,
  chartId: String
})
const content = ref('');
const echartsRef = ref(null);
let chartInstance = null;
const message = ref(props.message);

const initChart = (series, year) => {
  const option = {
    animation: false,
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: year
    },
    yAxis: {
      type: 'value'
    },
    series: series
  };


  chartInstance = echarts.init(echartsRef.value);
  chartInstance.setOption(option);
};


function renderPage(res_content, jsonData) {
  content.value = res_content;

  if (jsonData) {
    const series = [];
    jsonData.areas.forEach(item => {
      series.push({
        name: item.area,
        type: 'line',
        stack: 'Total',
        data: item.data
      })
    });

    initChart(series, jsonData.year);
  }
}

function sseRenderPage() {
  if (!message.value) return false;
  const { industry, area, key, applicant } = JSON.parse(message.value);

  const conditions = {
    time: + new Date(),
    industry,
    area,
    key,
    theme: '',
    dataType: 'patent_area',
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

setTimeout(() => {
  sseRenderPage();
}, 2000);

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

// onMounted(() => {
//   const { industry, area, key, applicant } = JSON.parse(message.value);

//   const conditions = {
//     time: + new Date(),
//     industry,
//     area,
//     key,
//     theme: '',
//     dataType: 'patent_area',
//     applicant,
//   };

//   const fetchData = {
//     inputs: {
//       conditions: JSON.stringify(conditions)
//     },
//     query: '生成印刷行业分析报告', // 用户对话框中输入的内容
//     response_mode: 'streaming', // 'blocking',// 固定传
//     conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
//     user: 'liruinan' // userName.value, // 用户名，区分请求用户
//   }
//   sseFetch(fetchData, (res_content, jsonData) => {
//     content.value = res_content;
//     // {"areas": [{"area": "广东", "data": [0, 0, 3, 2177, 2]}, {"area": "上海", "data": [0, 0, 3, 0, 0]}, {"area": "福建", "data": [0, 3, 0, 0, 0]}, {"area": "江苏", "data": [1, 3, 3, 1820, 0]}, {"area": "安徽", "data": [0, 0, 0, 586, 0]}, {"area": "美国", "data": [4, 4, 0, 0, 0]}, {"area": "日本", "data": [21, 15, 0, 0, 0]}, {"area": "英国", "data": [1, 0, 0, 0, 0]}, {"area": "德国", "data": [1, 0, 0, 0, 0]}, {"area": "山东", "data": [0, 0, 0, 699, 0]}, {"area": "浙江", "data": [0, 5, 2, 1418, 0]}, {"area": "湖南", "data": [0, 0, 2, 0, 0]}], "year": [2017, 2018, 2019, 2020, 2021]}
//     if (jsonData) {
//       const series = [];
//       jsonData.areas.forEach(item => {
//         series.push({
//           name: item.area,
//           type: 'line',
//           stack: 'Total',
//           data: item.data
//         })
//       });

//       initChart(series, jsonData.year);
//     }
//   });

// });
</script>

<style scoped>
@import "../../styles/reportModule.css";
</style>