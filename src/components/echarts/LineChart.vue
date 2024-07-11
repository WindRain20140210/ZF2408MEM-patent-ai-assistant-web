<template>
  <div ref="echartsRef" :style="{ width, height }"></div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import * as echarts from "echarts";
import {chunkArray} from "@/utils/utils";

let colors = ['#EEE', '#FFA', '#DEB', '#1E9']

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

    const xArray = props.data.x;
    const yArray = props.data.y;

    // [ [], [], [], [], [] ]
    // current data structure ...
    const yArrays = chunkArray(yArray, 5); // len=5

    // build line chart dataSet
    const series = new Array(0);
    for (let i = 0; i < yArrays.length; i++) {
      series.push({
        data: yArrays[i],
        type: 'line',
        areaStyle: {color: colors[i], opacity: 0.3},
        smooth: true
      })
    }

    // init chart
    const initChart = () => {
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xArray, // data: ['2019', '2020', '2021', '2022', '2023'],   // x轴数据 years
          name: '年份',
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '申请数量',   // y轴名称
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        series: series
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
