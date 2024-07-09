
<script setup>

import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <v-app>

    <!-- application header layout -->
    <AppHeader/>

    <!-- main layout -->
    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

