<template>
    <v-main class="bg-wrapper">
        <v-container>

            <v-row style="height: 40px; justify-content: end; margin-top: 2px; margin-right: 5px;">
                <v-btn
                @click="$router.push('/search')"
                prepend-icon="mdi-wrench"
                variant="outlined">
                创建专利报告
                </v-btn>
            </v-row>

                  <!-- main - row -->
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

              <v-data-table 
              :items="listdata"
              :headers="headers"
              >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        class="me-2"
                        size="small"
                        @click="generate_pdf_fn(item)"
                    >
                    mdi-arrow-down	
                    </v-icon>
                    <v-icon
                        size="small"
                        @click="report_delete_fn(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
              
            </v-card>

            <!-- conform delete dialog -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">确定删除此专利报告吗？</v-card-title>
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
    </v-main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { report_list, report_delete, generate_pdf } from '../api/api' 

const headers = [
    {title: '报告ID', key: 'id', align: 'center',},
    {title: '报告名称', key: 'title', align: 'center',},
    {title: '最后更新', key: 'update_time', align: 'center',},
    {title: '操作', key: 'actions', sortable: false, align: "center"},
];

const listdata = ref([]);

const report_list_fn = async()=>{
    const res = await report_list()
    listdata.value = res.data;
} 

const report_delete_fn = async(item)=>{
    const data = {
        'ids': [ parseInt(item.id) ],
        'userId': '21914df4-4745-43da-979a-c4adca6a58c0'
    }
    const res = await report_delete(data)
    // 删除接口有问题
} 

const generate_pdf_fn = async(item)=>{
    const data = {
        // 'reportId': item.id,
        'reportId': '47',

    }
    const res = await generate_pdf(data)
    console.log(res, '?????')
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
</style>