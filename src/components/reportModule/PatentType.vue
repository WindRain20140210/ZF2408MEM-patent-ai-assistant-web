<template>
  <div class="wrap" :id=chartId>
    <p class="title">专利类型</p>
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


const initChart = (seriesData) => {
  const option = {
    // title: {
    //     text: 'Referer of a Website',
    //     subtext: 'Fake Data',
    //     left: 'center'
    // },
    // tooltip: {
    //     trigger: 'item'
    // },
    // legend: {
    //     orient: 'vertical',
    //     left: 'left'
    // },
    series: [
      {
        name: '专利类型',
        type: 'pie',
        radius: '50%',
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  chartInstance = echarts.init(echartsRef.value);
  chartInstance.setOption(option);
};


function renderPage(res_content, jsonData) {
  content.value = res_content;

  if (jsonData) {

    // 遍历对象数组并修改字段名
    jsonData.data = jsonData?.data?.map(item => {
      return {
        name: item.type,
        value: item.num
      };
    });

    initChart(jsonData.data);
  }
}

function sseRenderPage() {
  if (!message.value) return false;
  const { industry, area, key, applicant, report_id } = message.value;

  const conditions = {
    industry,
    area,
    key,
    theme: '',
    dataType: 'patent_type',
    applicant,
    report_id,
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
}, 3000);


watch(
  () => props.detailData,
  (newValue) => {
    if (newValue) {
      const res_content = newValue.content
      const jsonData = JSON.parse(newValue.data);
      renderPage(res_content, jsonData)
    }
  },
);

</script>
<style scoped>
@import "../../styles/reportModule.css";
</style>