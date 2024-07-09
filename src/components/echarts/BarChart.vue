<script setup>

import {onMounted} from 'vue'
import * as echarts from 'echarts';

// mock data
function generate_years() {
  let arr = [10]
  for (let i = 0; i < 10; i++) {
    arr[i] = i + 2015;
  }
  return arr
}

function generate_data() {
  let arr = [10]
  for (let i = 0; i < 10; i++) {
    let number = Math.random() * 1000
    arr[i] = parseInt(number.toString(10));
  }
  return arr
}

// Vue lifecycle hook ...
onMounted(() => {
  let myChart = echarts.init(document.getElementById('main'));
  // config chart
  myChart.setOption({
    title: {
      text: '专利趋势'
    },
    tooltip: {},
    xAxis: {
      data: generate_years()
    },
    yAxis: {},
    series: [
      {
        name: '专利数量',
        type: 'bar',
        data: generate_data()
      }
    ]
  })
})
</script>

<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>
