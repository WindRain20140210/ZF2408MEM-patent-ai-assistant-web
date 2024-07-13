<template>
    <div ref="echartsRef" :style="{ width, height }"></div>
  </template>
  
  <script>
  import {onMounted, onUnmounted, ref, watch} from "vue";
  import * as echarts from "echarts";
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
        const option  = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
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
  