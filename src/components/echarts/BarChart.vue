<template>
  <div ref="echartsRef" :style="{ width, height }"></div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import * as echarts from "echarts";

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
    },
  },

  setup(props) {
    const echartsRef = ref(null);
    let chartInstance = null;

    const xArray = props.data.x;
    const yArray = props.data.y;

    // build Bar chart dataSet
    let seriesDataSet = new Array(0)
    yArray.forEach(function (item) {
      seriesDataSet.push({
        name: "专利数量",
        type: "bar",
        data: item
      })
    });

    const initChart = () => {
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: props.data.x,
          name: '年份',
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '专利申请',   // y轴名称
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        series: [
          {
            name: "专利数量",
            type: "bar",
            data: props.data.y
          },
        ],
      };

      if (echartsRef.value) {
        chartInstance = echarts.init(echartsRef.value);
        chartInstance.setOption(option);
      }
    };

    onMounted(() => {
      initChart();
    });

    watch(
      () => props.option, // ???
      (newOption) => {
        if (chartInstance) {
          chartInstance.setOption(newOption);
        }
      }
    );

    onUnmounted(() => {
      chartInstance && chartInstance.dispose();
    });

    return {echartsRef};
  },
};
</script>
