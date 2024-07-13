<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>

      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">

          <!-- sheet blow the button -->
          <div>
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item @click="$router.push('/search')">
                  生成报告
                </v-list-item>

                <v-list-item
                  style="background-color: #F6F6F6; width:100%; height: 100%">
                  我的报告
                </v-list-item>
              </v-list>
            </v-sheet>
          </div>
        </v-col>

        <!-- left side blank -->
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

              <!-- main data table -->
              <!-- display records of my patents -->
              <v-data-table
                v-model:search="search"
                :items="items"
                :headers="headers"
                :items-per-page="8">

                <!-- right side button -->
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

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    // left - list mock tab
    left_tabs: [
      "生成报告",
      "我的报告"
    ],
    // sheet - mock data
    search: '',
    headers: [
      {title: '序号', key: 'id', align: 'center',},
      {title: '报告名称', key: 'title', align: 'center',},
      {title: '创建时间', key: 'createTime', align: 'center',},
      {title: '操作', key: 'actions', sortable: false, align: "center"},
    ],
    items: [
      {
        id: 1,
        title: '一种关于锂电池提升能量密度的研究报告',
        createTime: '2024-07-05 23:30:00',
        dbId: 1,
      },
      {
        id: 2,
        title: '一种关于提高能源使用效率实现碳中和的研究报告',
        createTime: '2024-07-07 10:30:31',
        dbId: 2,
      },
      {
        id: 3,
        title: '正极材料及其制备方法、二次电池与终端设备',
        createTime: '2024-07-05 23:30:00',
        dbId: 3,
      },
      {
        id: 4,
        title: '一种关于提高能源使用效率实现碳中和的研究报告',
        createTime: '2021-02-17 10:30:31',
        dbId: 4,
      },
      {
        id: 5,
        title: '一种关于锂电池提升能量密度的研究报告',
        createTime: '2022-03-23 23:30:00',
        dbId: 5,
      },
      {
        id: 6,
        title: '改性剂及其用途、正极材料的改性方法',
        createTime: '2021-06-03 7:30:31',
        dbId: 6,
      },
      {
        id: 7,
        title: '外形结构设计专利、电解液',
        createTime: '2022-05-04 23:30:00',
        dbId: 7,
      },
      {
        id: 8,
        title: '材料技术专利、二次电池与终端设备',
        createTime: '2023-06-05 9:30:31',
        dbId: 8,
      }
    ],

  }),
  methods: {
    downloadItem(item) {
      // download patent paper
      // this. = this.items.indexOf(item)
      console.log("download DataBase ID:" + item.db)
    },
    deleteItem(item) {
      // deleteItem
      console.log("delete DataBase ID:" + item.db)
    }
  },
}
</script>
