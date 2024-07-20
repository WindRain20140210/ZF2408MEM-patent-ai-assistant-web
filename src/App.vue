<template>
  <v-app>

    <AppHeader/>
    <v-main>
      <router-view/>
    </v-main>

  </v-app>
    <iframe v-if="!robotShow" src="http://110.42.103.198:23837/chatbot/RwuJBwZo2Z9KRzvF" frameborder="0" id="difyRot" allow="microphone">
    </iframe>
  <div id="robot" v-if="robotShow" @click="toggle">
    <img src="@/assets/robot.png" id="robot" alt=""/>
 </div>
</template>
<script setup>

import AppHeader from "@/components/AppHeader.vue";
import { ref } from "vue";
const robotShow = ref(true);

function toggle() {
  robotShow.value = !robotShow.value;
 }
</script>


<style>
    #difyRot {
        position: fixed;
        bottom: 10px;
        right: 30px;
        width: 400px;
        height: 400px;
        z-index: 1000;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    #robot {
        cursor: pointer;
        position: fixed;
        bottom: 10px;
        right: 30px;
        width: 100px;
        height: 100px;
        z-index: 1000;
    }
</style>

