<template>
  <div class="container">
    <v-img
      width="100"
      @click="assistantClick"
      src="@/assets/robot.png"
      class="align-right"
    />
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
  margin-top: -120px;
}

.align-right {
  float: right;
  margin-right: 50px
}
</style>

<script>
export default {
  methods: {
    assistantClick() {
      console.log("assistant click ...")
    }
  }
}
</script>
