<script setup>

import {onMounted, ref} from "vue";
import {UserService} from "/src/http/api.js";

const leftTabs = [
  "Playground 1",
  "Playground 2",
  "mock 3",
  "mock 4",
  "mock 5",
  "mock 6",
  "mock 7",
  "mock 8"
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

// ....
const search = ref('')

// Network requests
const initBarchart = async () => {
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

// lifecycle method ...
onMounted(() => {
  // page observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id, "is in viewport");

          if (entry.target.id === "barChart" && xBar.value.length === 0) {
            initBarchart();

          } else if (entry.target.id === "lineChart" && xLine.value.length === 0) {
            initLineChart();

          } else return false;
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  // bar chart
  observer.observe(barChartRef.value);
  // line chart
  observer.observe(lineChartRef.value);
});

</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>

        <!-- right side blank -->
        <v-col>
          <v-sheet
            min-height="80vh"
            rounded="lg">

            <!-- main content -->
            <v-card flat>
              <!-- title -->
              <v-card-title class="d-flex align-center pe-2">
                &nbsp;
                报告图表生成测试

                <v-spacer></v-spacer>

                <v-text-field
                  v-model="search"
                  density="compact"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-text-field>
              </v-card-title>

              <v-divider></v-divider>

              <!-- !!!! table area !!!! -->
              <!-- BarChart -->
              <div id="barChart" ref="barChartRef">
                <v-bar-chart
                  :data="{x:xBar, y:yBar}"
                  v-if="barError === false && barLoading === false"
                />
                <div v-else class="nodata">
                  <div v-if="barLoading === true">
                    <img src="../assets/loading.jpg" alt="" class="loading"/>
                    <div class="loadingText">加载中</div>
                  </div>
                  <div v-if="barLoading === false && barError === true">请求失败</div>
                </div>
              </div>

              <!-- CircleChart -->
              <v-circle-chart/>

              <!-- RelationshipChart -->
              <v-relationship-chart/>

              <!-- GanttChart -->
              <v-gantt-chart/>

              <!-- LineChart -->
              <!-- mock loading cost time, when view in viewport auto net request -->
              <div id="lineChart" ref="lineChartRef">
                <v-line-chart
                  :data="{ x:xLine, y:yLine}"
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
              <!-- !!!! table area !!!! -->
            </v-card>

          </v-sheet>
        </v-col>

        <!-- left side sheet -->
        <v-col cols="3">
          <v-sheet rounded="lg">
            <v-list rounded="lg">

              <v-list-item
                v-for="n in leftTabs"
                :key="n"
                :title="`${n}`"
                link
              ></v-list-item>

            </v-list>
          </v-sheet>
        </v-col>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>
// my custom components
import vBarChart from "./echarts/BarChart.vue";
import vLineChart from "./echarts/LineChart.vue";
import vCircleChart from "./echarts/CircleChart.vue";
import vRelationshipChart from "./echarts/RelationshipChart.vue"
import vGanttChart from "./gantt/GanttChart.vue"

// export default
export default {
  components: {
    vBarChart,
    vLineChart,
    vCircleChart,
    vRelationshipChart,
    vGanttChart
  }
}
</script>

<style scoped>
@import "../styles/loading.css";
</style>
