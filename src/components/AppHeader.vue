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
  <v-app-bar flat height="150" class="header">
    <v-container style="background-color: #0586fd">

      <v-row>
        <v-col class="logo-wrap">
          <img src="@/assets/my_logo.png" class="logo" alt=""/>
          <span class="logo-p">FT-AGENT-SPACE</span>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="btn-wrap">
              <v-card-text>
                <v-btn text="标准高级检索" class="float-right search-btn"></v-btn>
              </v-card-text>
            </v-col>

            <v-col>
              <v-card-text>
                <v-text-field
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="请输入关键词"
                  variant="solo"
                  hide-details
                  single-line
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>

      </v-row>


    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      '/',
      '/',
      '/',
      '/',
      '/generate',
      '/record',
      '/search',
    ],
  }),
}
</script>

<style scoped>
@import "../styles/header.css";
</style>
