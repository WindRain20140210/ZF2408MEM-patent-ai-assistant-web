<template>
  <v-dialog max-width="300" v-model="dialog">
    <v-card
        text="确认删除此报告吗？"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            取消
          </v-btn>

          <v-btn @click="report_delete_fn()">
            确定
          </v-btn>
        </template>
      </v-card>
</v-dialog>

  <v-main class="bg-wrapper">
      <v-sheet min-height="50vh" class="container-box">

        <!-- main content -->
        <v-card flat>
          <div class="top-wrapper">
            <p class="main-title">我的报告</p>
            <div class="search-box">
              <v-text-field v-model="searchKey" density="compact" label="请输入报告名称"
              flat hide-details 
              variant="outlined"
              single-line></v-text-field>
              <span class="mock-btn">搜索</span>
            </div>
            <v-btn @click="$router.push('/search')" class="text-none ms-4 text-white btn-search" rounded="0"
              variant="flat">
              创建专利报告
            </v-btn>
          </div>

          <!-- <v-divider></v-divider> -->
          <div class="table-wrapper">
            <v-data-table
            :items="listdata"
            v-model:search="searchKey"
            :headers="headers"
            class="table-header">
              <template v-slot:item.actions="{ item }">
                  <router-link :to="{ path: '/generate', query: { id: item.id } }" class="link">查看</router-link>
                  <span class="bit">|</span>
                  <span class="link"
                   @click="delete_fn(item)">删除</span>
                  <span class="bit">|</span>
                  <span class="link" @click="generate_pdf_fn(item)">下载</span>
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
  { title: '报告ID', key: 'id', align: 'center', width: '10%', style: 'background-color: #f1f2f6' },
  { title: '报告名称', key: 'title', align: 'center', width: '45%' },
  { title: '最后更新', key: 'update_time', align: 'center',  width: '20%'  },
  { title: '操作', key: 'actions', sortable: false, align: "center", width: '25%' },
];

const listdata = ref([]);
const searchKey = ref('');
const dialog = ref(false);
const delete_item = ref(null);

const report_list_fn = async () => {
  const res = await report_list()
  listdata.value = res.data;
}

const delete_fn = async (item) => {
  dialog.value = true;
  delete_item.value = item;
}

const report_delete_fn = async () => {
  dialog.value = false;
  const data = {
    'ids': [parseInt(delete_item.value.id)],
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
      a.download = item.title + '.pdf'; // Specify the filename
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

<style>
.table-header th span{
  font-weight: bolder!important;
} 
.table-header th {
  background-color:rgb(250, 250, 250);
}
</style>

<style scoped>
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

.search-box {
  margin: 20px auto;
  width: 552px;
  position: relative;
}
.mock-btn {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 70px;
  height: 40px;
  background-color: #0586fd;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
}
</style>