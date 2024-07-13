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
        const option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
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
  