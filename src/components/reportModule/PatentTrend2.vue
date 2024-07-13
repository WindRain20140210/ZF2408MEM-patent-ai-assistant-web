<template>
  <div class="wrap">
    <p class="title">技术发展及演变趋势分析</p>
    <p class="content">{{ content }}</p>
  </div>
  <div ref="echartsRef" :style="{ width, height }"></div>
</template>

  <script setup>
    const content = ref('');
    const echartsRef = ref(null);
    let chartInstance = null;

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

  onMounted(() => {
      const conditions = {
          time: + new Date(),
          industry: '印刷',
          area: '广东',
          keyWord: '',
          territory: '',
          dataType: 'patent_trend2'
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
          content.value = res_content;
          // const jsonData = {"data": [{"year": 2016, "authorization_num": 0.0, "apply_num": 1.0, "proportion": 0.0}, {"year": 2018, "authorization_num": 0.0, "apply_num": 2.0, "proportion": 0.0}, {"year": 2019, "authorization_num": 0.0, "apply_num": 3.0, "proportion": 0.0}, {"year": 2020, "authorization_num": 1079.0, "apply_num": 1098.0, "proportion": 0.9827}, {"year": 2021, "authorization_num": 2.0, "apply_num": 0.0, "proportion": null}]}

          if (jsonData) {
            const data = jsonData.data;
            const years = data.map(item => item.year);
            const authorization_nums = data.map(item => item.authorization_num);
            const apply_nums = data.map(item => item.apply_num);
            let percent = [];
            authorization_nums.forEach((num, index) => {
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
        });
  });
</script>
  <script>
  import {onMounted, onUnmounted, ref, watch} from "vue";
  import * as echarts from "echarts";
  import sseFetch from '/src/api/sseFetch';
  
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
  
      // init chart
const initChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: 'Temperature',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: 'Precipitation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
  
<style>
.wrap {
  padding: 20px!important;
}
.title {
  font-weight: bold;
  color: #333333;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
}
.content {
  color: #666666;
  font-size: 14px;
  line-height: 30px;
  text-indent: 2em;
}
</style>