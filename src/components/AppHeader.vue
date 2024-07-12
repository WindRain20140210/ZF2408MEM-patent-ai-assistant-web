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
  <!-- <v-app-bar flat height="150" id="inspire" class="bg-grey-lighten-3"> -->
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
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="请输入关键词"
                  variant="solo"
                  hide-details
                  single-line
                  @click:append-inner="onClick"
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
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
      '/playground',
      '/playground',
      '/playground',
      '/playground',
      '/playground',
      '/report'
    ],
  }),
}
</script>

<style scoped>
.header {
  background-color: #0586fd !important;
}

header .logo {
  display: inline-block;
  width: 100px;
  height: auto;
  vertical-align: middle;
  margin-top: -13px;
}

header .logo-p {
  color: #ffffff;
  font-weight: bolder;
  line-height: 80px;
  font-size: 28px;
  font-family: emoji;
}

.search-btn {
  background-color: #0858fd;
  color: #ffffff;
}

.logo-wrap {
  width: 300px;
}

.btn-wrap {
  margin-right: -40px;
  margin-top: 3px;
}
</style>
