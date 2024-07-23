<template>
  <div class="wrap" :id=chartId>
    <p class="title">技术构成分析</p>
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


const initChart = (formattedData) => {
  const option = {
    // title:{
    //         text:'矩形树',
    //         left: 'center',     // 设置标题水平居中
    //         top: 20             // 设置标题距离顶部的距离为20像素
    //     },
    //     tooltip: {        //浮窗效果
    //     },
    series: [
      {
        // name:'11111111',           
        type: 'treemap',     //图例样式，矩形树
        levels: [
          // 第一个层级的配置
          {
            // 设置每个矩形的边框样式
            itemStyle: {
              borderColor: '#ffffff',  // 边框颜色
              borderWidth: 4,       // 边框宽度
              gapWidth: 1,          // 矩形之间的间隔宽度
            },
            // // 设置上方标签的显示方式
            // upperLabel: {
            //     show: false,  // 是否显示上方标签
            // },
          },
          // 第二个层级的配置
          // {
          //     // 设置每个矩形的边框样式
          //     itemStyle: {
          //         borderColor: '#ffffff',  // 边框颜色
          //         borderWidth: 2,       // 边框宽度
          //         gapWidth: 1,          // 矩形之间的间隔宽度
          //     },
          //     // 设置上方标签的显示方式
          //     upperLabel: {
          //         show: false,  // 是否显示上方标签
          //     },
          // },
        ],
        data: formattedData
      }
    ]
  };

  chartInstance = echarts.init(echartsRef.value);
  chartInstance.setOption(option);
};


function renderPage(res_content, jsonData) {
  content.value = res_content;

  if (jsonData) {
    const formattedData = jsonData?.data?.map(item => ({
      name: item.class + item.num,
      value: item.num
    }));

    initChart(formattedData);

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
    dataType: 'patent_technology',
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
}, 4000);

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