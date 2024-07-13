<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>

      <v-row>
        <!-- right side sheet -->
        <v-col cols="3">

          <!-- sheet blow the button -->
          <div style="margin-top: 15px">
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
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-text-field>
              </v-card-title>

              <v-divider></v-divider>

              <!-- main data table -->
              <v-data-table
                v-model:search="search"
                :items="items"
                :headers="headers">

                <template v-slot:header.stock>
                  <div class="text-end">Stock</div>
                </template>

                <template v-slot:item.rating="{ item }">
                  <v-rating
                    :model-value="item.rating"
                    color="orange-darken-2"
                    density="compact"
                    size="small"
                    readonly
                  ></v-rating>
                </template>

                <template v-slot:item.stock="{ item }">
                  <div class="text-end"></div>
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
      {
        title: '专利标题',
        align: 'start',
        key: 'name'
      },
      {
        title: '专利价值',
        align: 'end',
        key: 'price'
      },
      {
        title: '专利热度',
        align: 'start',
        key: 'rating'
      },
      {title: '描述信息'},
    ],
    items: [
      {
        name: '一种微球状费托合成铁基催化剂及其制备方法',
        price: 699,
        rating: 5,
        stock: true,
      },
      {
        name: '高纯度蛇毒纤溶酶的制备方法及其药物制剂',
        price: 345,
        rating: 4,
        stock: false,
      },
      {
        name: '一种治疗眼底出血症的中药及其制备方法',
        price: 267,
        rating: 4,
        stock: false,
      },
      {
        name: '基于等离子波的纳米光刻光学装置',
        price: 799.,
        rating: 3,
        stock: false,
      },
      {
        name: '治疗心脑血管疾病的药物',
        price: 876,
        rating: 4,
        stock: false,
      },
      {
        name: '分体建造坞内合拢的造船方法',
        price: 345,
        rating: 4,
        stock: false,
      },
      {
        name: '一种防治农作物再植障碍病的肥料',
        price: 123,
        rating: 3,
        stock: false,
      },
      {
        name: '苯甲酸亚锡的新合成方法',
        price: 826,
        rating: 1,
        stock: false,
      },
      {
        name: '灌注桩基础分布式光纤传感检测方法',
        price: 982,
        rating: 5,
        stock: false,
      },
      {
        name: '制备抗病毒口服液的方法',
        price: 134,
        rating: 4,
        stock: false,
      }
    ]
  }),
}
</script>
