
<script setup>

import {onMounted} from 'vue'
import * as echarts from 'echarts';

let countries = ["中国", "美国", "日本", "德国", "法国", "韩国", "阿根廷", "意大利", "南极", "不丹", "英国", "阿拉伯", "中东", "印度尼西亚", "菲律宾", "缅甸", "泰国", "印度", "越南", "其他"]

let colors = ['#EEE', '#FFA', '#DEB', '#1E9']

// mock data len = 5
function generate_name() {
  let arr = []
  while (arr.length < 5) {
    let random = parseInt((Math.random() * 10).toString(10))
    let country = countries[random]
    if (arr.indexOf(country) === -1) {
      arr.push(country)
    }
  }
  return arr
}

function generate_value() {
  let arr = []
  for (let i = 0; i < 5; i++) {
    let number = Math.random() * 1000
    arr[i] = parseInt(number.toString(10));
  }
  return arr
}

function get_color() {
  let random = parseInt((Math.random() * 10).toString(10))
  return colors[random]
}

function create_mock_data() {
  let array = []
  for (let i = 0; i < 5; i++) {
    let data = {
      data: generate_value(), type: 'line', areaStyle: {
        color: get_color(), opacity: 0.5
      }, smooth: true
    }
    array.push(data)
  }
  return array
}

// Vue life cycle hook ...
onMounted(() => {
  const myChart = echarts.init(document.getElementById('main3'));
  myChart.setOption({
    xAxis: {
      data: generate_name()
    },
    yAxis: {},
    series: create_mock_data()
  })
})
</script>

<template>
  <h3>折线图</h3>
  <div id="main3" style="width: 600px;height:400px;"></div>
</template>
