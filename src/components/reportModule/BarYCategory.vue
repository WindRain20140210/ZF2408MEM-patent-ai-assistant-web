<template>
    <div>
      <p>{{ content }}</p>
    </div>
    <div ref="echartsRef" :style="{ width, height }"></div>
  </template>
  <script setup>
    const content = ref('');    onMounted(() => {
        const { industry, area, key, applicant } = JSON.parse(message.value);

        const conditions = {
            time: + new Date(),
            industry: '',
            area: '',
            key: '',
            theme: '',
            dataType: 'patent_applicant'
        };
          
        const fetchData = {
            inputs: {
                conditions: JSON.stringify(conditions)
            },
            query: '生成锂电池分析报告', // 用户对话框中输入的内容
            response_mode: 'streaming', // 'blocking',// 固定传
            conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
            user: 'liruinan' // userName.value, // 用户名，区分请求用户
        }
  
        sseFetch(fetchData, (res) => {
          content.value += res.answer;
        });
  
    });
  </script>
  <script>
  import {onMounted, onUnmounted, ref, watch} from "vue";
  import * as echarts from "echarts";
  import sseFetch from '/src/api/sseFetch';

//   import {chunkArray} from "@/utils/utils";
  
//   let colors = ['#EEE', '#FFA', '#DEB', '#1E9']
  
  export default {
    name: "EChartsComponent",
    props: {
      data: {
        type: Object,
        required: true,
      },
      width: {
        type: String,
        default: "100%",
      },
      height: {
        type: String,
        default: "400px",
      }
    },
  
    setup(props) {
      const echartsRef = ref(null);
      let chartInstance = null;
  
    //   const xArray = props.data.x;
    //   const yArray = props.data.y;
  
      // [ [], [], [], [], [] ]
      // current data structure ...
    //   const yArrays = chunkArray(yArray, 5); // len=5
  
    //   // build line chart dataSet
    //   const series = new Array(0);
    //   for (let i = 0; i < yArrays.length; i++) {
    //     series.push({
    //       data: yArrays[i],
    //       type: 'line',
    //       areaStyle: {color: colors[i], opacity: 0.3},
    //       smooth: true
    //     })
    //   }
  
      // init chart
      const initChart = () => {
        const option = {
        title: {
            text: 'World Population'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
            {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
        };
  
        if (echartsRef.value) {
          chartInstance = echarts.init(echartsRef.value);
          chartInstance.setOption(option);
        }
      };
  
      // onMounted
      onMounted(() => {
        initChart();
      });
  
      // watch
      watch(
        () => props.option, // ????
        (newOption) => {
          if (chartInstance) {
            chartInstance.setOption(newOption);
          }
        }
      );
  
      // onUnmounted
      onUnmounted(() => {
        chartInstance && chartInstance.dispose();
      });
  
      return {echartsRef};
    },
  };
  </script>
  