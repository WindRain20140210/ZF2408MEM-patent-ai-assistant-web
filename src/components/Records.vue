<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>

        <v-col>
          <v-sheet
            min-height="50vh"
            rounded="lg">

            <!-- main content -->
            <v-card flat>
              <!-- title -->
              <v-card-title class="d-flex align-center pe-2">
                &nbsp;
                我的报告
                <v-spacer></v-spacer>

                <v-text-field
                  v-model="search"
                  density="compact"
                  label="请输入报告名称"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-text-field>
              </v-card-title>

              <v-divider></v-divider>
              <!-- main data table - display records of my patents -->
              <v-data-table
                v-model:search="search"
                :items="items"
                :headers="headers"
                :items-per-page="8">

                <!-- action button -->
                <template v-slot:item.actions="{ item }">
                  <!-- download patent -->
                  <v-icon
                    class="me-2"
                    size="small"
                    @click="downloadItem(item)"
                    style="transform: rotate(180deg);">
                    mdi-arrow-up-bold-box-outline
                  </v-icon>
                  <!-- delete patent -->
                  <v-icon
                    size="small"
                    @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>

            <!-- conform delete dialog -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">确定要删除此项专利的生成记录吗?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeDelete">
                    取消
                  </v-btn>

                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteItemConfirm">
                    确定
                  </v-btn>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- AI Assistant -->
    <Assistant/>
  </v-main>
</template>

<script>
import Assistant from "@/components/Assistant.vue";
import {UserService} from "@/http/api";
import {ref} from "vue";

// {
// id: 1,
//  title: '一种关于锂电池提升能量密度的研究报告',
//  createTime: '2024-07-05 23:30:00',
//  dbId: 1,
// }

// request network
const recordList = ref([]);
const fetchUserRecords = async (params) => {
  const res = await UserService.userrecords(params)
  if (res.status === 200) {
    const data = res.data.data;
    recordList.value.push(...data)
  } else {
    // server resp error ...
  }
}

// ...
async function requestDeleteRecord(params, onExpected, onUnExpected) {
  const res = await UserService.deleterecord(params)
  if (res.status === 200) {
    const dbId = res.data['dbId'];
    console.log("received server response= " + dbId)

    if (dbId > 0) onExpected()
  } else {
    // server resp error ...
    onUnExpected()
  }
}

// download file
// no.1 server resp data contain download url - current
// no.2 request server to get the download url

// https protocol - use a tag to download file with token
// 创建一个点击事件触发下载
function downloadFile(fileUrl) {
  // 文件下载地址
  // const fileUrl = 'https://example.com/path/to/file';

  // 设置请求头
  const headers = new Headers();
  headers.append('Authorization', 'Bearer YourAccessToken'); // 设置授权头，替换YourAccessToken为实际的访问令牌

  // 发起 Fetch 请求
  fetch(fileUrl, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.blob())
    .then(blob => {
      // 创建一个虚拟的链接元素，模拟点击下载
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'filename.ext'; // 设置下载文件名，替换filename.ext为实际的文件名和扩展名
      document.body.appendChild(link);

      // 模拟点击
      link.click();

      // 移除虚拟链接元素
      document.body.removeChild(link);
    })
    .catch(error => console.error('下载失败：', error));
}

export default {
  components: {
    Assistant
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    items: [],
    left_tabs: [
      "生成报告",
      "我的报告"
    ],
    headers: [
      {title: '序号', key: 'id', align: 'center',},
      {title: '报告名称', key: 'title', align: 'center',},
      {title: '最后更新', key: 'createTime', align: 'center',},
      {title: '操作', key: 'actions', sortable: false, align: "center"},
    ],
    editedItem: {
      id: 0,
      title: '',
      createTime: '',
      dbId: 0,
      fileUrl: '',
    },
  }),

  created() {
    this.initialize()
    fetchUserRecords()
  },

  methods: {
    // request to server get data
    initialize() {
      this.items = recordList.value
    },

    // download patent file
    downloadItem(item) {
      console.log("download item: " + item.fileUrl)

      // normal use a tag to download file
      let a = document.createElement("a");
      a.setAttribute("href", item.fileUrl);
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    // delete user generate patent item in list
    deleteItem(item) {
      // item.dbId
      console.log("delete item of Database ID:", item.dbId)

      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // user confirm to delete select item.
      // need request to server pass which patent is deleted.
      requestDeleteRecord(
        {
          dbId: this.editedItem.dbId
        },
        () => {
          // server delete item successful
          this.items.splice(this.editedIndex, 1)
          this.closeDelete()

        },
        () => {
          // error delete failed, do not update ui list
          this.closeDelete()
        })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>
