<template>
  <div class="wrap" :id=chartId>
    <p class="title">技术发展及演变趋势分析</p>
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


const initChart = (result) => {

  const option = {
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'cross',
    //     crossStyle: {
    //       color: '#999'
    //     }
    //   }
    // },
    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    legend: {
      data: ['授权', '申请', '授权占比']
    },
    xAxis: [
      {
        type: 'category',
        data: result.years,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '专利数量',
        // min: 0,
        // max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '授权占比',
        // min: 0,
        // max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '授权',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: result.authorization_nums
      },
      {
        name: '申请',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value;
          }
        },
        data: result.apply_nums
      },
      {
        name: '授权占比',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %';
          }
        },
        data: result.percent,
      }
    ]
  };
  
        chartInstance = echarts.init(echartsRef.value);
        chartInstance.setOption(option);
    };

function renderPage(res_content, jsonData) {
  content.value = res_content;
  
  if (jsonData) {
    const data = jsonData.data;
    const years = data?.map(item => item.year);
    const authorization_nums = data?.map(item => item.authorization_num);
    const apply_nums = data?.map(item => item.apply_num);
    let percent = [];
    authorization_nums?.forEach((num, index) => {
      let per = 0;
      if(num >= apply_nums[index]) {
        per = 0
      } else {
        per = ((num / apply_nums[index]) * 100).toFixed(2);
      }
      
      percent.push(per)
    });
    const result = {
        years: years,
        authorization_nums: authorization_nums,
        apply_nums: apply_nums,
        percent
    };

    initChart(result);

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
      dataType: 'patent_trend2',
      applicant,
    };
    const fetchData = {
      inputs: {
          conditions: JSON.stringify(conditions)
      },
      query: '生成分析报告', // 用户对话框中输入的内容
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
}, 1000);
 
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
<style scoped>
@import "../../styles/reportModule.css";
</style>