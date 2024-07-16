<script setup>

import {onMounted, ref} from "vue";
import {UserService} from "/src/http/api.js";

const leftTabs = [
  {title: '技术背景和目标', domId: 'tab1'},
  {title: '技术发展及衍变趋势分析', domId: 'tab2'},
  {title: '申请人排名分析', domId: 'tab3'},
  {title: '地域分析', domId: 'tab4'},
  {title: '专利类型', domId: 'tab5'},
  {title: '技术构成分析', domId: 'tab6'},
  {title: '专利集中度分析', domId: 'tab7'}
]

// every item margin top
const marginTop = 20;

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
const activeTabIndex = ref(0);

// CircleChart
const circleChartRef = ref(null);
const circleLoading = ref(true);
const circleError = ref(false);

const xNamesCircle = ref([]);
const yValsCircle = ref([]);

// GanttChart
const ganttChartRef = ref(null);
const ganttLoading = ref(true);
const ganttError = ref(false);

const ganttDataSet = ref([]);

// network request
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
const initGanttChart = async () => {
  const res = await UserService.ganttchart();
  if (res.status === 200) {
    const data = res.data.data;
    ganttError.value = false;
    ganttLoading.value = false;

    data.forEach(function (item) {
      const element = {
        "end": item["end"],
        "id": item["id"],
        "name": item["name"],
        "progress": item["progress"],
        "start": item["start"],
      }
      console.log("data => " + JSON.stringify(element));

      ganttDataSet.value.push(element);
    });

  } else {
    ganttLoading.value = false;
    ganttError.value = true;
  }
};


// .....

const scrollTabElement = (tab) => {
  const element = document.getElementById(tab.domId);
  const offsetTop = element.offsetTop;
  window.scrollTo({top: offsetTop - marginTop, left: 0, behavior: 'smooth'});
};

// ... lifecycle hook ...
onMounted(() => {
  const element = document.getElementById(leftTabs[0].domId);
  const offsetTop = element.offsetTop;
  window.scrollTo({top: offsetTop - marginTop, left: 0, behavior: 'smooth'});
  window.addEventListener('scroll', () => {
    const scrollTop = Math.round(document.documentElement.scrollTop, document.body.scrollTop);
    leftTabs.forEach((tab, index) => {
      const element = document.getElementById(tab.domId);
      const clientHeight = element.clientHeight;
      const offsetTop = element.offsetTop;
      if (scrollTop >= (offsetTop - (marginTop + 4)) && scrollTop <= clientHeight + offsetTop) {
        activeTabIndex.value = index;
      } else if (scrollTop >= window.document.body.scrollHeight - window.innerHeight - marginTop) { // 判断是否滑到底部
        activeTabIndex.value = leftTabs.length - 1;
      }
    })
  });

  // page observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id, "is in viewport");

          // BarChart
          if (entry.target.id === "barChart" && xBar.value.length === 0) {
            initBarChart();

          }
          // LineChart
          else if (entry.target.id === "lineChart" && xLine.value.length === 0) {
            initLineChart();

          }
          // CircleChart
          else if (entry.target.id === "circleChart" && xNamesCircle.value.length === 0) {
            initCircleChart();

          }
          // GanttChart
          else if (entry.target.id === "ganttChart" && ganttDataSet.value.length === 0) {
            initGanttChart();
          } else {
            return false;
          }
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  // observe elements
  // BarChart
  observer.observe(barChartRef.value);

  // CircleChart
  observer.observe(circleChartRef.value);

  // LineChart
  observer.observe(lineChartRef.value);

  // GanttChart
  observer.observe(ganttChartRef.value);
});
</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>

      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">
          <v-sheet rounded="lg">
            <div class="leftTabsFixed">
              <v-list rounded="lg">
                <v-list-item
                  v-for="(item, index) in leftTabs"
                  :class="{ activeTab: activeTabIndex === index }"
                  :key="item"
                  :title="`${ item.title }`"
                  link
                  @click="scrollTabElement(item)"
                />
              </v-list>
            </div>
          </v-sheet>
        </v-col>

        <!-- left side blank -->
        <v-col>
          <!-- !!!! table area !!!! -->

          <!-- 技术背景和目标 -->
          <v-sheet min-height="40vh" rounded="lg">
            <v-container id="tab1">
              <v-card-title>技术背景和目标</v-card-title>
              <v-row>
                <!-- 展示文字和图片均分 柱状图信息要展示完全 -->
                <v-col cols="4">
                  <h6>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                    <br/> <br/>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                  </h6>
                </v-col>

                <v-col cols="8">
                  <!-- BarChart -->
                  <!-- mock loading cost time, when view in viewport auto net request -->
                  <v-card flat>

                    <div id="barChart" ref="barChartRef">
                      <v-bar-chart :data="{ x: xBar, y: yBar }" v-if="barError === false && barLoading === false"/>

                      <div v-else class="nodata">
                        <div v-if="barLoading === true">
                          <img src="../assets/loading.jpg" alt="" class="loading"/>
                          <div class="loadingText">加载中</div>
                        </div>
                        <div v-if="barLoading === false && barError === true">请求失败</div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <!-- 技术发展及衍变趋势分析 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab2">
              <v-card-title>技术发展及衍变趋势分析</v-card-title>
              <v-row>
                <!-- 展示文字和图片均分 柱状图信息要展示完全 -->
                <v-col cols="4">
                  <h6>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                    <br/> <br/>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                  </h6>
                </v-col>

                <v-col cols="8">
                  <!-- CircleChart -->
                  <!-- mock loading cost time, when view in viewport auto net request -->
                  <v-card flat>
                    <div id="circleChart" ref="circleChartRef">
                      <v-circle-chart :data="{ names: xNamesCircle, values: yValsCircle }"
                                      v-if="circleError === false && circleLoading === false"/>

                      <div v-else class="nodata">
                        <div v-if="circleLoading === true">
                          <img src="../assets/loading.jpg" alt="" class="loading"/>
                          <div class="loadingText">加载中</div>
                        </div>
                        <div v-if="circleLoading === false && circleError === true">请求失败</div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <!-- 申请人排名分析 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab3">
              <v-card-title>申请人排名分析</v-card-title>
              <v-row>
                <!-- 展示文字和图片均分 柱状图信息要展示完全 -->
                <v-col cols="4">
                  <h6>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                    <br/> <br/>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes
                    it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises,
                    and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to
                    follow
                    an instruction in a prompt and provide a detailed response. We are excited to introduce ChatGPT to
                    get users’ feedback and learn about its strengths and weaknesses. During the research preview,
                    usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).
                  </h6>
                </v-col>

                <v-col cols="8">
                  <!-- LineChart -->
                  <!-- mock loading cost time, when view in viewport auto net request -->
                  <v-card flat>
                    <div id="lineChart" ref="lineChartRef">
                      <v-line-chart :data="{ x: xLine, y: yLine }"
                                    v-if="lineError === false && lineLoading === false"/>

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
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <!-- 地域分析 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab4">
              <v-card-title>地域分析</v-card-title>
              <v-row>
                <!-- 展示文字和图片均分 柱状图信息要展示完全 -->
                <v-col cols="4">
                  <h6>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                    trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                    introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                    During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                    window).
                    <br/> <br/>
                    We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                    makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                    premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                    trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                    introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                    During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                    window).
                  </h6>
                </v-col>

                <v-col cols="8">
                  <!-- GanttChart -->
                  <!-- mock loading cost time, when view in viewport auto net request -->
                  <v-card flat>
                    <div id="ganttChart" ref="ganttChartRef">
                      <v-gantt-chart :data="ganttDataSet" v-if="lineError === false && lineLoading === false"/>

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
                  </v-card>
                </v-col>

              </v-row>
            </v-container>
          </v-sheet>

          <!-- 专利类型 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab5">
              <v-card-title>专利类型</v-card-title>
              <v-col cols="4">
                <h6>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                  <br/> <br/>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                </h6>
              </v-col>
              <v-col cols="8"></v-col>
            </v-container>
          </v-sheet>

          <!-- 技术构成分析 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab6">
              <v-card-title>技术构成分析</v-card-title>
              <v-col cols="4">
                <h6>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                  <br/> <br/>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                </h6>
              </v-col>
              <v-col cols="8"></v-col>
            </v-container>
          </v-sheet>

          <!-- 专利集中度分析 -->
          <v-sheet min-height="40vh" rounded="lg" style="margin-top: 45px">

            <v-container id="tab7">
              <v-card-title>专利集中度分析</v-card-title>
              <v-col cols="4">
                <h6>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                  <br/> <br/>
                  We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format
                  makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect
                  premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is
                  trained to follow an instruction in a prompt and provide a detailed response. We are excited to
                  introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses.
                  During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new
                  window).
                </h6>
              </v-col>
              <v-col cols="8"></v-col>
            </v-container>

            <!-- !!!! table area !!!! -->
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

import vGanttChart from "./gantt/GanttChart.vue"
// import vRelationshipChart from "./echarts/RelationshipChart.vue"

// export default
export default {
  components: {
    vBarChart,
    vCircleChart,
    vLineChart,
    vGanttChart,
    // vRelationshipChart,
  }
}
</script>

<style scoped>
@import "../styles/loading.css";
@import "../styles/utils.css";

.activeTab {
  background: #477991;
  color: #fff;
}

.leftTabsFixed {
  position: fixed;
}
</style>
