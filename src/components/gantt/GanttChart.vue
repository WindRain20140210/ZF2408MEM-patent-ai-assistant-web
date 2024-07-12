<template>
  <div class="center-flex">
    <svg id="gantt" ref="ganttChartsRef" :style="{ width, height }"></svg>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import Gantt from "frappe-gantt";

export default {
  name: "GanttChartsComponent",
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
      default: "1000px",
    },
    height: {
      type: String,
      default: "600px",
    },
  },

  setup(props) {
    const ganttChartsRef = ref(null);
    let ganttChart = null;

    const dataSet = props.data.values();

    let dataArr = new Array(0);
    dataSet.forEach((dataItem) => {
      const element = {
        id: dataItem["id"],
        name: dataItem["name"],
        start: dataItem["start"],
        end: dataItem["end"],
        progress: parseInt(dataItem["progress"], 10)
      };
      dataArr.push(element)
    })

    onMounted(() => {
      if (ganttChartsRef.value) {
        ganttChart = new Gantt("#gantt", dataArr);
        ganttChart.change_view_mode('Year')
      }
    });

    watch(
      () => props.option,
      (newOption) => {
        if (ganttChart) {
          ganttChart = new Gantt("#gantt", newOption);
          ganttChart.change_view_mode('Year')
        }
      }
    );

    onUnmounted(() => {
      ganttChart && ganttChart.dispose();
    });

    return {ganttChartsRef};
  },
};

</script>

<style scoped>
@import "../../styles/utils.css";
</style>

