<template>
  <v-main class="bg-wrapper">
      <v-sheet min-height="50vh" class="container-box">

        <!-- main content -->
        <v-card flat>
          <div class="top-wrapper">
            <p class="main-title">我的报告</p>
            <v-btn @click="$router.push('/search')" class="text-none ms-4 text-white btn-search" rounded="0"
              variant="flat">
              创建专利报告
            </v-btn>
          </div>

          <!-- title -->
          <!-- <v-card-title class="d-flex align-center pe-2">
            我的报告
            <v-spacer></v-spacer>

            <v-text-field v-model="search" density="compact" label="请输入报告名称" prepend-inner-icon="mdi-magnify"
              variant="solo-filled" flat hide-details single-line></v-text-field>
          </v-card-title> -->

          <!-- <v-divider></v-divider> -->
          <div class="table-wrapper">
            <v-data-table :items="listdata" :headers="headers">
              <template v-slot:item.actions="{ item }">
                  <span class="link" @click="generate_pdf_fn(item)">下载</span>
                  <span class="bit">|</span>
                  <span class="link" @click="report_delete_fn(item)">删除</span>
                  <span class="bit">|</span>
                  <router-link :to="{ path: '/generate', query: { id: item.id } }" class="link">查看</router-link>
              </template>
            </v-data-table>
          </div>


        </v-card>

        <!-- conform delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确定删除此专利报告吗？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                取消
              </v-btn>

              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">
                确定
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-sheet>
  </v-main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { report_list, report_delete } from '../api/api'

const headers = [
  { title: '报告ID', key: 'id', align: 'center', },
  { title: '报告名称', key: 'title', align: 'center', },
  { title: '最后更新', key: 'update_time', align: 'center', },
  { title: '操作', key: 'actions', sortable: false, align: "center" },
];

const listdata = ref([]);

const report_list_fn = async () => {
  const res = await report_list()
  listdata.value = res.data;
}

const report_delete_fn = async (item) => {
  const data = {
    'ids': [parseInt(item.id)],
    'userId': '21914df4-4745-43da-979a-c4adca6a58c0'
  }
  await report_delete(data)
  report_list_fn()
}

const generate_pdf_fn = async (item) => {

  fetch('http://110.42.103.198:22440/generate-pdf', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reportId: item.id + '',
      userId: '21914df4-4745-43da-979a-c4adca6a58c0'
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob(); // Assuming the response is a PDF file
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf'; // Specify the filename
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  // const data = {
  //   'reportId': item.id,
  //   'userId': '21914df4-4745-43da-979a-c4adca6a58c0'
  //   // 'reportId': '47',
  // }
  // const res = await generate_pdf(data)
  // console.log(res, '?????')
  // listdata.value = res;
  // 没有调试呢 ========= ？？？？

}

onMounted(() => {
  report_list_fn()
});

</script>

<style lang="scss" scoped>
.bg-wrapper {
  background-color: #f1f2f6;
}

.container-box {
  width: 1392px!important;
  margin: 24px auto;
}

.link {
  text-decoration: none;
  padding: 0 10px;
  color: #4cb5f0;
  cursor: pointer;
}

.bit {
  color: #999;
}

.table-wrapper {
  padding: 30px 50px;
}

.top-wrapper {
  padding: 30px 50px;
}

.main-title {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.btn-search {
  float: right;
  background-color: #0586fd;
}
</style>