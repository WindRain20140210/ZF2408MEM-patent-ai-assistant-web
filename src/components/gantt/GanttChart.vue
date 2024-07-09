
<script setup>

import {onMounted} from 'vue'
import Gantt from "frappe-gantt";

const tasks = [
  {
    id: 'Task 1',
    name: '高安全性三元材料电池',
    start: '2019-4-28',
    end: '2020-12-31',
    progress: 100
  },
  {
    id: 'Task 2',
    name: '固态电池技术开发',
    start: '2020-12-28',
    end: '2021-12-31',
    progress: 100
  },
  {
    id: 'Task 3',
    name: '电池模组一体化设计',
    start: '2018-12-28',
    end: '2023-12-31',
    progress: 100
  },
  {
    id: 'Task 4',
    name: '云端电池管理系统',
    start: '2018-6-28',
    end: '2021-12-31',
    progress: 0
  },
  {
    id: 'Task 5',
    name: '相变材料热管理技术',
    start: '2019-5-20',
    end: '2021-12-31',
    progress: 0
  },
  {
    id: 'Task 6',
    name: '电池热失控防护技术',
    start: '2019-6-28',
    end: '2024-6-1',
    progress: 0
  }
];

onMounted(() => {
  const gantt = new Gantt("#gantt", tasks);
  gantt.change_view_mode('Year')
})

</script>

<template>
  <h3>Gantt Chart</h3>
  <div style="width: 600px;height:600px;">
    <svg id="gantt"></svg>
  </div>
</template>

