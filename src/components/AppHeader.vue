<script setup>
const links = [
  '首页',
  '标准',
  '技术',
  '专利',
  '企业',
  '专家',
  '报告'
]
</script>

<template>
  <v-app-bar flat height="150" id="inspire" class="bg-grey-lighten-3">
    <v-container style="background-color: #005FAF">
      <v-row>
        <v-col>
          <v-img src="@/assets/buaa_logo.png"
                 max-height="100"
                 max-width="200">
          </v-img>
        </v-col>

        <v-col>
          <v-responsive max-width="300" class="float-right">
            <!-- Login Button -->
            <v-btn text="登录" class="float-right" color="white"></v-btn>

            <!-- Search -->
            <v-text-field
              class="float-right"
              density="comfortable"
              label="Search"
              rounded="lg"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>

            <!-- Advanced Search Button -->
            <v-btn text="标准高级检索" class="float-right" color="white"
            ></v-btn>
          </v-responsive>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-container class="mx-auto d-flex align-center justify-center">
            <!-- Top Tab -->
            <v-btn
              v-for="(link, index) in links"
              :key="link"
              :text="link"
              variant="text"
              color="white"
              @click="$router.push($data.links[index])"
            ></v-btn>
          </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      '/search',
      '标准',
      '技术',
      '专利',
      '企业',
      '专家',
      '/report'
    ],
  }),
}
</script>

<style scoped>

</style>
