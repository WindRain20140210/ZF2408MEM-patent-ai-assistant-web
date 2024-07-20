<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>

      <v-container
        style="display: flex;
        z-index: 999;
        margin-top: -20px"
        class="leftTabsFixed">

        <v-row
          style="width: 100%;
          background: white;">

          <v-col
            style="display: flex;
            align-items: center;"
            cols="8">

            <v-btn
              @click="$router.push('/search')"
              prepend-icon="mdi-arrow-left"
              variant="plain">
              返回
            </v-btn>

            <div style="margin-left: 15px">
              <p style="font-size: 14px">
                一种关于锂电池脉冲电容器提升能量密度指标的研究
              </p>

            </div>
          </v-col>

          <v-col style="display: flex;  align-items: center;" cols="4">
            <!-- <p style="font-size: 12px; color: lightgray">上次更新: 2024-07-12</p> -->

            <v-btn style="margin-left: 10px"
                   append-icon="mdi-checkbox-marked-circle"
                   variant="plain"
                   rounded="xl">
              下载报告
            </v-btn>

            <v-btn @click="$router.push('/record')"
                   style="margin-left: 5px"
                   append-icon="mdi-arrow-right"
                   variant="plain"
                   rounded="xl">
              历史报告
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-row>
        <!-- right side sheet -->
        <!-- <v-col cols="3">
          <v-sheet rounded="lg">
            <div class="leftTabsFixed" style="top: 230px;">
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
        </v-col> -->

                <!-- left side blank -->
          <v-col>
            <v-sheet
              min-height="80vh"
              rounded="lg">

              <!-- main content -->
              <v-card flat>
                <v-patent-trend1 :message = message  :detailData = dataPatentTrend1 />
                <v-patent-trend2 :message = message :detailData = dataPatentTrend2  />
                <v-patent-applicant :message = message :detailData = dataPatentApplicant />
                <v-patent-area :message = message :detailData = dataPatentArea />
                <v-patent-type :message = message :detailData = dataPatentType />
                <v-patent-technology :message = message :detailData = dataPatentTechnology />
                <v-patent-concentration :message = message :detailData = dataPatentConcentration />
              </v-card>
            </v-sheet>
          </v-col>

        </v-row>

    </v-container>
  </v-main>
</template>
<script>
import vPatentTrend1 from "./reportModule/PatentTrend1.vue"
import vPatentTrend2 from "./reportModule/PatentTrend2.vue"
import vPatentApplicant from "./reportModule/PatentApplicant.vue"
import vPatentArea from "./reportModule/PatentArea.vue"
import vPatentType from "./reportModule/PatentType.vue"
import vPatentTechnology from "./reportModule/PatentTechnology.vue"
import vPatentConcentration from "./reportModule/PatentConcentration.vue"


export default {
  components: {
    vPatentTrend1,
    vPatentTrend2,
    vPatentApplicant,
    vPatentArea,
    vPatentType,
    vPatentTechnology,
    vPatentConcentration,
  }
}
</script> 

<script setup>
import { onMounted, ref } from "vue";
import router from '@/router'
import { report_detail, report_save } from '../api/api' 
const message = ref(null);
// const detailData = ref(null);
const dataPatentTrend1 = ref(null);
const dataPatentTrend2 = ref(null);
const dataPatentApplicant = ref(null);
const dataPatentArea = ref(null);
const dataPatentType = ref(null);
const dataPatentTechnology = ref(null);
const dataPatentConcentration = ref(null);


const report_save_fn = async()=>{
    const res = await report_save()
    console.log(res, 'report_save_fn')
} 
const report_detail_fn = async(id)=>{
    const data = {
      'id': parseInt(id),
      'userId': '21914df4-4745-43da-979a-c4adca6a58c0'
    }
    const res = await report_detail(data)
    if(res.data){
      res.data.forEach(item => {
        if(item.type === "patent_trend1") {
            dataPatentTrend1.value = item
        }
        if(item.type === "patent_trend2") {
            dataPatentTrend2.value = item
        }
        if(item.type === "patent_applicant") {
            dataPatentApplicant.value = item
        }
        if(item.type === "patent_area") {
            dataPatentArea.value = item
        }
        if(item.type === "patent_type") {
            dataPatentType.value = item
        }
        if(item.type === "patent_technology") {
            dataPatentTechnology.value = item
        }
        if(item.type === "patent_concentration") {
            dataPatentConcentration.value = item
        }
      });

    }
    // console.log(res, 'report_detail_fn')
} 
  const query = router.currentRoute.value.query;

  if(query.id) {
    report_detail_fn(query.id)
  }

  if(query.message) {
    message.value = decodeURIComponent(query.message);
  // console.log(message.value, 'query')
  report_save_fn()
  }


  // const leftTabs = [
  //   "技术背景和目标",
  //   "技术现状分析",
  //   "具体研究内容",
  //   "技术发展路线图",
  //   "主要玩家分析",
  //   "当前技术方案梳理",
  //   "重点专利解读",
  //   "可能的研发方向",
  // ];
</script>
