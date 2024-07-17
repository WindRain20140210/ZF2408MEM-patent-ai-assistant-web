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
            <p style="font-size: 12px; color: lightgray">上次更新: 2024-07-12</p>

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
        <v-col cols="3">
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
