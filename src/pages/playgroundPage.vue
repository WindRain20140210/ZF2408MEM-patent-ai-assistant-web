
<script setup>

</script>

<template>
  <v-app>
    <Playground />
  </v-app>
</template>

<script>
// import sseFetch from '../api/sseFetch';
export default {
  name: 'playgroundPage',
}
</script>

<script setup>
  //   const conditions = {
  //     time: + new Date(),
  //     industry: '',
  //     region: '',
  //     keyWord: '',
  //     territory: '',
  //     dataType: 'PatentCount'
  //   };
    
  //   const fetchData = {
  //       inputs: {
  //         conditions: JSON.stringify(conditions)
  //       },
  //       query: '专利报告分析 生成报告', // 用户对话框中输入的内容
  //       response_mode: 'streaming', // 'blocking',// 固定传
  //       conversation_id: '', // currentConversationId.value, // 会话id, 第一次请求后获取
  //       user: 'beihang' // userName.value, // 用户名，区分请求用户
  //   }
  // const msg = await sseFetch(fetchData);
</script>
