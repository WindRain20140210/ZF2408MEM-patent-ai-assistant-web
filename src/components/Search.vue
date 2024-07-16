<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col>

          <v-sheet
            min-height="50vh"
            rounded="lg"
            class="d-flex justify-center align-center">

            <!-- main content -->
            <v-card
              class="mx-auto"
              elevation="3"
              width="80%"
              height="100%">

              <v-card-title class="py-5 font-weight-black">
                专利报告范围检索
              </v-card-title>

              <v-card-text>
                填写你的筛选条件，我们将根据专利、文献，通过专利只能助手为你快速生成个性化专利报告。
              </v-card-text>

              <v-card-text>
                <div class="text-subtitle-2 font-weight-black mb-1">
                  关键词
                </div>

                <v-row>
                  <v-col cols="4">
                    <div>
                      <v-combobox
                        v-model="selectedItem"
                        :items="items"
                        density="comfortable"
                        label="类别"
                      ></v-combobox>
                    </div>

                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="请输入关键字"
                      variant="outlined"
                      single-line
                      v-model="userInput"
                      @mouseleave="onTextFieldMouseLeave(userInput)"
                    />
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col cols="6" md="6">
                    <div class="text-center" style="height: 100%; width: 100%;">{{ num }} 份专利</div>
                  </v-col>

                  <v-col cols="6" md="6">
                    <v-btn
                      class="text-none"
                      color="secondary"
                      size="x-large"
                      variant="flat"
                      @click="searchBtnOnClick(selectedItem, userInput)"
                      block>
                      生成报告
                    </v-btn>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>

          </v-sheet>
        </v-col>
      </v-row>

      <!-- AI Assistant -->
      <Assistant/>
    </v-container>
  </v-main>
</template>

<script>
import Assistant from "@/components/Assistant.vue";
import {UserService} from "@/http/api";
import {ref} from "vue";


let timer = null;
let number = ref(0)

// request server to query patent number
async function getPatentNumber() {
  const resp = await UserService.getnumbers();
  if (resp.status === 200) {
    console.log("server query patent number resp: " + resp.data['patentNum'])
    number.value = resp.data['patentNum']
  } else {
    // error
  }
}

// request server to search
// const requestSearch = async () => {
//   const resp = await UserService.search();
//   if (resp.status === 200) {
//
//   } else {
//     // error
//   }
// }

// ...

function isEmptyString(str) {
  return str === null || str === undefined || str.trim() === '';
}

// .....


export default {
  components: {
    Assistant
  },
  data: () => ({
    loading: false,
    // left - list tab
    left_tabs: [
      "生成报告",
      "我的报告"
    ],

    // user selected type
    items: ['筛选条件一', '筛选条件二', '筛选条件三', '筛选条件四', '筛选条件五'],
    selectedItem: '筛选条件一',

    userInput: '',
    num: number // patent number
  }),
  watch: {},
  methods: {
    onTextFieldMouseLeave(userInput) {
      clearTimeout(timer); // 防抖
      timer = setTimeout(function () {
        // 这里面要执行的操作
        if (!isEmptyString(userInput)) {
          console.log("userInput: " + userInput)
          getPatentNumber()
        } else {
          number.value = 0
        }

      }, 2000);
    },
    searchBtnOnClick(type, input) {
      console.log("search params: " + type + " // " + input);
      // request server to search result and nav to generate page
      this.$router.push('/generate');
    },
  },
}
</script>

<style scoped>

.text-center {
  display: flex;
  align-items: center;
  justify-content: center; /* 如果还需要水平居中，可以加上这个属性 */
  height: 100px; /* 设置div的高度 */
}

</style>

