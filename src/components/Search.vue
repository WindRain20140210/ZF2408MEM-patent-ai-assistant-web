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
          <v-sheet
            min-height="80vh"
            rounded="lg">

            <!-- main content -->

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {createRouter as router} from "vue-router";

export default {
  data: () => ({
    // left - list mock tab
    left_tabs: [
      "生成报告",
      "我的报告"
    ]
  }),
  methods: {
    handleLeftSheetItemIndex(index) {
      if (index === 1) {
        router.push('record')
      }
    }
  }
}
</script>
