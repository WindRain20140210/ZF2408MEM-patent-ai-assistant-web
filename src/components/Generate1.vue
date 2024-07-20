<script setup>

import {onMounted, ref} from "vue";
import {UserService} from "/src/http/api.js";
import sseFetch from '/src/api/sseFetch';

const conditions = {
      time: + new Date(),
      industry: '',
      region: '',
      key: '',
      theme: '',
      dataType: 'patent_trend1'
  };
      
  const fetchData = {
      inputs: {
          conditions: JSON.stringify(conditions)
      },
      query: '专利报告分析 生成报告', // 用户对话框中输入的内容
      response_mode: 'streaming', // 'blocking',// 固定传
      conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
      user: 'beihang' // userName.value, // 用户名，区分请求用户
  }

  // sseFetch(fetchData);


const leftTabs = [
  "技术背景和目标",
  "技术现状分析",
  "具体研究内容",
  "技术发展路线图",
  "主要玩家分析",
  "当前技术方案梳理",
  "重点专利解读",
  "可能的研发方向",
]

// BarChart
const barChartRef = ref(null)
const barLoading = ref(true);
const barError = ref(true);

const xBar = ref([]);
const yBar = ref([]);

// LineChart
const lineChartRef = ref(null);
const lineLoading = ref(true);
const lineError = ref(false);

const xLine = ref([]);
const yLine = ref([]);

// CircleChart
const circleChartRef = ref(null);
const circleLoading = ref(true);
const circleError = ref(false);

const xNamesCircle = ref([]);
const yValsCircle = ref([]);

// GanttChart
// const ganttChartRef = ref(null);
// const ganttLoading = ref(true);
// const ganttError = ref(false);

// const ganttDataSet = ref([]);

// ....
/**
 * BarChart data net request
 * @returns {Promise<void>}
 */
const initBarChart = async () => {
  const res = await UserService.barchart();
  if (res.status === 200) {
    const data = res.data.data;
    barError.value = false;
    barLoading.value = false;

    data.forEach((item) => {
      xBar.value.push(item.name);
      yBar.value.push(item.value);
    });

  } else {
    barLoading.value = false;
    barError.value = true;
  }
};

/**
 * CircleChart data net request
 * @returns {Promise<void>}
 */
const initCircleChart = async () => {
  const res = await UserService.circlechart();
  if (res.status === 200) {
    const data = res.data.data;
    circleError.value = false;
    circleLoading.value = false;

    data.forEach((item) => {
      xNamesCircle.value.push(item.name);
      yValsCircle.value.push(item.value);
    });

  } else {
    circleLoading.value = false;
    circleError.value = true;
  }
};

/**
 * LineChart data net request
 * @returns {Promise<void>}
 */
const initLineChart = async () => {
  const res = await UserService.linechart();
  if (res.status === 200) {
    const data = res.data.data;
    lineError.value = false;
    lineLoading.value = false;

    data.forEach(function (item) {
      xLine.value.push(item.name)
      yLine.value.push(item.arr)
    });

  } else {
    lineLoading.value = false;
    lineError.value = true;
  }
};

/**
 * GanttChart data net request
 * @returns {Promise<void>}
 */
// const initGanttChart = async () => {
//   const res = await UserService.ganttchart();
//   if (res.status === 200) {
//     const data = res.data.data;
//     ganttError.value = false;
//     ganttLoading.value = false;
//
//     data.forEach(function (item) {
//       const element = {
//         "end": item["end"],
//         "id": item["id"],
//         "name": item["name"],
//         "progress": item["progress"],
//         "start": item["start"],
//       }
//       console.log("data => " + JSON.stringify(element));
//
//       ganttDataSet.value.push(element);
//     });
//
//   } else {
//     ganttLoading.value = false;
//     ganttError.value = true;
//   }
// };

// ... lifecycle hook ...
onMounted(() => {
  // page observer
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         console.log(entry.target.id, "is in viewport");

  //         if (entry.target.id === "barChart" && xBar.value.length === 0) {
  //           initBarChart();

  //         } else if (entry.target.id === "lineChart" && xLine.value.length === 0) {
  //           initLineChart();

  //         } else if (entry.target.id === "circleChart" && xNamesCircle.value.length === 0) {
  //           initCircleChart();

  //         }
  //         // else if (entry.target.id === "ganttChart" && ganttDataSet.value.length === 0) {
  //         //   initGanttChart();
  //         // }
  //         else {
  //           return false;
  //         }
  //       }
  //     });
  //   },
  //   {
  //     rootMargin: "0px",
  //     threshold: 0.1,
  //   }
  // );

  // observe elements
  // observer.observe(barChartRef.value);
  // observer.observe(circleChartRef.value);
  // observer.observe(lineChartRef.value);
  // observer.observe(ganttChartRef.value);
});
</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">
          <v-sheet rounded="lg">
            <v-list rounded="lg">

              <v-list-item
                v-for="n in leftTabs"
                :key="n"
                :title="`${n}`"
                link
              />

            </v-list>
          </v-sheet>
        </v-col>

        <!-- left side blank -->
        <v-col>
          <v-sheet
            min-height="80vh"
            rounded="lg">

            <!-- main content -->
            <v-card flat>
              <v-bar-simple/>
              <!-- <v-mix-line-bar/>
              <v-bar-y-category/>
              <v-line-smooth/>
              <v-pie-simple/> -->
              <!-- !!!! table area !!!! -->

              <!-- BarChart -->
              <!-- mock loading cost time, when view in viewport auto net request -->
              <!-- <div id="barChart" ref="barChartRef">
                <v-bar-chart
                  :data="{ x:xBar, y:yBar }"
                  v-if="barError === false && barLoading === false"
                />

                <div v-else class="nodata">
                  <div v-if="barLoading === true">
                    <img src="../assets/loading.jpg" alt="" class="loading"/>
                    <div class="loadingText">加载中</div>
                  </div>
                  <div v-if="barLoading === false && barError === true">请求失败</div>
                </div>
              </div> -->

              <!-- CircleChart -->
              <!-- mock loading cost time, when view in viewport auto net request -->
              <!-- <div id="circleChart" ref="circleChartRef">
                <v-circle-chart
                  :data="{ names:xNamesCircle, values:yValsCircle }"
                  v-if="circleError === false && circleLoading === false"
                />

                <div v-else class="nodata">
                  <div v-if="circleLoading === true">
                    <img src="../assets/loading.jpg" alt="" class="loading"/>
                    <div class="loadingText">加载中</div>
                  </div>
                  <div v-if="circleLoading === false && circleError === true">请求失败</div>
                </div>
              </div> -->

              <!-- LineChart -->
              <!-- mock loading cost time, when view in viewport auto net request -->
              <!-- <div id="lineChart" ref="lineChartRef">
                <v-line-chart
                  :data="{ x:xLine, y:yLine }"
                  v-if="lineError === false && lineLoading === false"
                />

                <div v-else class="nodata">
                  <div v-if="lineLoading === true">
                    <img src="../assets/loading.jpg" alt="" class="loading"/>
                    <div class="loadingText">加载中</div>
                  </div>
                  <div v-if="lineLoading === false && lineError === true">
                    请求失败
                  </div>
                </div>
              </div> -->

              <!-- GanttChart -->
              <!-- mock loading cost time, when view in viewport auto net request -->
              <!--
              <div id="ganttChart" ref="ganttChartRef">
                <div class="title center-flex">专利研发周期</div>

                <v-gantt-chart
                  :data="ganttDataSet"
                  v-if="lineError === false && lineLoading === false"
                />

                <div v-else class="nodata">
                  <div v-if="lineLoading === true">
                    <img src="../assets/loading.jpg" alt="" class="loading"/>
                    <div class="loadingText">加载中</div>
                  </div>
                  <div v-if="lineLoading === false && lineError === true">
                    请求失败
                  </div>
                </div>
              </div>
              -->

              <!-- ****** RelationshipChart ***** -->
              <!-- <v-relationship-chart/> -->
              <!-- !!!! table area !!!! -->
            </v-card>

          </v-sheet>
        </v-col>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>

// custom components
import vBarChart from "./echarts/BarChart.vue";
import vCircleChart from "./echarts/CircleChart.vue";
import vLineChart from "./echarts/LineChart.vue";

// import vGanttChart from "./gantt/GanttChart.vue"
// import vRelationshipChart from "./echarts/RelationshipChart.vue"
import vLineSmooth from "./reportModule/LineSmooth.vue"
import vBarYCategory from "./reportModule/BarYCategory.vue"
import vMixLineBar from "./reportModule/MixLineBar.vue"
import vBarSimple from "./reportModule/BarSimple.vue"
import vPieSimple from "./reportModule/PieSimple.vue"


// export default
export default {
  components: {
    vBarChart,
    vCircleChart,
    vLineChart,
    // vGanttChart,
    // vRelationshipChart,
    vLineChart,
    vBarYCategory,
    vMixLineBar,
    vBarSimple,
    vPieSimple,
  }
}
</script>

<style scoped>
@import "../styles/loading.css";
@import "../styles/utils.css";
</style>