<template>
    <div class="wrap">
      <p class="title">申请人排名分析</p>
      <p class="content">{{ content }}</p>
    </div>
    <div ref="echartsRef" :style="{ width, height }"></div>
</template>
  
<script setup>
    const content = ref('');
    const echartsRef = ref(null);
    let chartInstance = null;

    const initChart = (yAxisData, seriesData) => {
        const option = {
        // title: {
        //     text: 'World Population'
        // },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //     type: 'shadow'
        //     }
        // },
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
            data: yAxisData,
        },
        series: [
            {
            type: 'bar',
            data: seriesData
            },
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
            dataType: 'patent_applicant'
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
          content.value = res_content;

          if (jsonData) {
            let grouped = {};
            jsonData.data.forEach(item => {
              for (let key in item) {
                if (!grouped[key]) {
                  grouped[key] = [];
                }
                grouped[key].push(item[key]);
              }
            });

            initChart(grouped.applicant, grouped.num);
          }
        });

    });
</script>
  <script>
  import { onMounted, ref } from "vue";
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