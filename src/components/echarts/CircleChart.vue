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

    const names = props.data.names;
    const values = props.data.values;

    // data array
    const data = new Array(0)
    names.forEach(function (item, index) {
      data.push({
        name: item, // part's name
        value: values[index], // part's value // % percentage val
      })
    });

    const initChart = () => {
      const option = {
        title: {
          text: '占比分析',
          left: 'center',
          top: 'center'
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: true,
              formatter: "{c} %",
              textStyle: {
                fontSize: 13,
              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: data
        }]
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
      () => props.option,
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
