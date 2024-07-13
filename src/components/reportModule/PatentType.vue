<template>
    <div class="wrap">
      <p class="title">专利类型</p>
      <p class="content">{{ content }}</p>
    </div>
    <div ref="echartsRef" :style="{ width, height }"></div>
</template>
  
<script setup>
    const content = ref('');
    const echartsRef = ref(null);
    let chartInstance = null;

    const initChart = (seriesData) => {
        const option = {
            // title: {
            //     text: 'Referer of a Website',
            //     subtext: 'Fake Data',
            //     left: 'center'
            // },
            // tooltip: {
            //     trigger: 'item'
            // },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left'
            // },
            series: [
                {
                name: '专利类型',
                type: 'pie',
                radius: '50%',
                data: seriesData,
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
            dataType: 'patent_type'
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

            // 遍历对象数组并修改字段名
            jsonData.data = jsonData.data.map(item => {
              return {
                name: item.type,
                value: item.num
              };
            });

            initChart(jsonData.data);
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