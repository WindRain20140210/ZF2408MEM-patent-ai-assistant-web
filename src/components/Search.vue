<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>

      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">

          <!-- top button -->
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item style="text-align:center">
                标准高级检索
              </v-list-item>
            </v-list>
          </v-sheet>

          <!-- sheet blow the button -->
          <div style="margin-top: 15px">
            <v-sheet rounded="lg">
              <v-list rounded="lg">

                <v-list-item>
                  生成报告
                </v-list-item>

                <v-list-item @click="$router.push('/record')">
                  我的报告
                </v-list-item>

              </v-list>
            </v-sheet>
          </div>
        </v-col>

        <!-- left side blank -->
        <v-col>

          <!-- main content -->
          <v-sheet
            min-height="80vh"
            rounded="lg"
            class="d-flex justify-center align-center">
            <!-- ********** -->
            <v-col>
              <v-row>
                <v-card
                  class="mx-auto"
                  prepend-icon="$vuetify"
                  subtitle="The #1 Vue UI Library"
                  width="500">

                  <template v-slot:title>
                    <span class="font-weight-black">关键词/检索式</span>
                  </template>

                  <v-card-text class="bg-surface-light pt-4">
                    <v-textarea
                      label="输入区域"
                      v-model="text"
                      rows="5"
                      outlined
                    ></v-textarea>
                  </v-card-text>
                </v-card>
              </v-row>

              <v-row class="justify-center align-center" style="margin-top:45px">
                <v-btn @click="$router.push('/generate')">生成报告</v-btn>
              </v-row>
            </v-col>
            <!-- ********** -->
          </v-sheet>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  data: () => ({
    // left - list mock tab
    left_tabs: [
      "生成报告",
      "我的报告"
    ]
  }),
  methods: {}
}
</script>
