<template>
  <v-app-bar flat height="150" class="header">
    <v-container style="background-color: #0586fd">

      <v-row>
        <v-col class="logo-wrap">
          <img src="@/assets/my_logo.png" class="logo" alt=""/>
          <span class="logo-p">FT-AGENT-SPACE</span>
        </v-col>
      </v-row>

    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
}
</script>

<style scoped>
@import "../styles/header.css";
</style>
