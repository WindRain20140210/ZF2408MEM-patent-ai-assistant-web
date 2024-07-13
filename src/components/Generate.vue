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
                <v-patent-trend1/>
                <v-patent-trend2/>
                <v-patent-type />
                <!-- <v-patent-area /> 地域先不展示 -->
                <v-patent-applicant />
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
import vPatentType from "./reportModule/PatentType.vue"
// import vPatentArea from "./reportModule/PatentArea.vue"
import vPatentApplicant from "./reportModule/PatentApplicant.vue"


export default {
  components: {
    vPatentTrend1,
    vPatentTrend2,
    vPatentType,
    // vPatentArea,
    vPatentApplicant,
  }
}
</script> 

<script setup>
  const leftTabs = [
    "技术背景和目标",
    "技术现状分析",
    "具体研究内容",
    "技术发展路线图",
    "主要玩家分析",
    "当前技术方案梳理",
    "重点专利解读",
    "可能的研发方向",
  ];
</script>