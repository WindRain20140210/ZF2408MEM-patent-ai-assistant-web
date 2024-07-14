<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">

          <!-- sheet blow the button -->
          <div>
            <v-sheet rounded="lg">
              <v-list rounded="lg">

                <v-list-item
                  style="background-color: #F6F6F6; width:100%; height: 100%">
                  生成报告
                </v-list-item>

                <v-list-item @click="$router.push('/record')">
                  我的报告
                </v-list-item>
              </v-list>
            </v-sheet>
          </div>
        </v-col>

        <!-- left side content -->
        <v-col>
          <!-- main content -->
          <v-sheet
            min-height="50vh"
            rounded="lg"
            class="d-flex justify-center align-center">

            <!-- ********** -->
            <v-card
              class="mx-auto"
              elevation="3"
              width="80%"
              height="100%">

              <v-card-title class="py-5 font-weight-black">
                专利报告范围检索
              </v-card-title>

              <v-card-text>
                专利报告分析，帮助专利转化和交易提供多维度参考依据
              </v-card-text>

              <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1">
                  关键词 / 检索式
                </div>

                <v-text-field
                  label="请生成一份关于新能源的专利报告"
                  variant="outlined"
                  single-line/>

                <v-row justify="center">
                  <v-col cols="12" md="6">
                    <v-btn
                      class="text-none"
                      color="secondary"
                      size="x-large"
                      variant="flat"
                      @click="$router.push('/generate')"
                      block>
                      生成报告
                    </v-btn>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>

            <!-- ********** -->
          </v-sheet>

        </v-col>

      </v-row>

      <!-- AI Assistant -->
      <Assistant />
    </v-container>
  </v-main>
</template>

<script>
import Assistant from "@/components/Assistant.vue";

export default {
  components: {Assistant},
  data: () => ({
    loading: false,
    // left - list mock tab
    left_tabs: [
      "生成报告",
      "我的报告"
    ],
  }),
  watch: {},
  methods: {

  }
}
</script>

