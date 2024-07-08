<template>
  <v-app id="inspire">

    <v-app-bar flat height="150">

      <v-container style="background-color: #005FAF">
        <v-row>
          <v-col>
            <v-img src="@/assets/buaa_logo.png"
                   max-height="100"
                   max-width="200"
            >

            </v-img>

          </v-col>

          <v-col>

            <v-responsive max-width="300" class="float-right">
              <!-- Login Button -->
              <v-btn text="登录" class="float-right" color="white"></v-btn>
              <!-- Search -->
              <v-text-field
                class="float-right"
                density="comfortable"
                label="Search"
                rounded="lg"
                variant="solo-filled"
                flat
                hide-details
                single-line
              ></v-text-field>
              <!-- Advanced Search Button -->
              <v-btn text="标准高级检索" class="float-right" color="white"
              ></v-btn>
            </v-responsive>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-container class="mx-auto d-flex align-center justify-center">
              <!-- Tab -->
              <v-btn
                v-for="link in links"
                :key="link"
                :text="link"
                variant="text"
                color="white"
              ></v-btn>
            </v-container>

          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3">
            <!-- right side sheet -->
            <v-sheet rounded="lg">
              <v-list rounded="lg">

                <v-list-item
                  v-for="n in left_tabs"
                  :key="n"
                  :title="`${n}`"
                  link
                ></v-list-item>

              </v-list>
            </v-sheet>
          </v-col>

          <!-- right side blank -->
          <v-col>
            <v-sheet
              min-height="80vh"
              rounded="lg"
            >

              <!-- main content -->
              <v-card flat>

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
                  :headers="headers"
                >

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
                    <div class="text-end">
                      <v-chip
                        :color="item.stock ? 'green' : 'red'"
                        :text="item.stock ? 'In stock' : 'Out of stock'"
                        class="text-uppercase"
                        size="small"
                        label
                      ></v-chip>
                    </div>
                  </template>
                </v-data-table>
              </v-card>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup>

const links = [
  '首页',
  '标准',
  '技术',
  '专利',
  '企业',
  '专家',
  '报告'
]
</script>

<script>

export default {
  data: () => ({
    links: [
      '首页',
      '标准',
      '技术',
      '专利',
      '企业',
      '专家',
      '报告'
    ],

    // left - list mock tab
    left_tabs: [
      "生成报告",
      "我的报告",
      "mock 1",
      "mock 2",
      "mock 3",
      "mock 4",
      "mock 5",
      "mock 6",
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
        name: '锂离子电池能量密度增长',
        price: 699.99,
        rating: 5,
        stock: true,
      },
      {
        name: '邻苯二甲酸二烯丙酯树脂改性化合物',
        price: 799.99,
        rating: 4,
        stock: false,
      },
      {
        name: '网络交换机的人工智能功能技术',
        price: 649.99,
        rating: 3,
        stock: true,
      },
      {
        name: '塑料土工格室条带排水孔制造模具',
        price: 1499.99,
        rating: 4,
        stock: true,
      },
      {
        name: '石墨电极双螺纹梳加工机床',
        price: 299.99,
        rating: 4,
        stock: false,
      },
      {
        name: '多元醇苯甲酸酯增塑剂',
        price: 699.99,
        rating: 5,
        stock: true,
      },
      {
        name: '一种在线修理方法及其专用组合机床',
        price: 799.99,
        rating: 4,
        stock: false,
      },
      {
        name: '二乙二醇二苯甲酸矾',
        price: 649.99,
        rating: 3,
        stock: true,
      },
      {
        name: '塑料土工格室条带排水孔制造模具',
        price: 1499.99,
        rating: 4,
        stock: true,
      },
      {
        name: '石墨电极双螺纹梳加工机床',
        price: 299.99,
        rating: 4,
        stock: false,
      },
      {
        name: '多元醇苯甲酸酯增塑剂',
        price: 699.99,
        rating: 5,
        stock: true,
      },
      {
        name: '一种在线修理方法及其专用组合机床',
        price: 799.99,
        rating: 4,
        stock: false,
      },
      {
        name: '二乙二醇二苯甲酸矾',
        price: 649.99,
        rating: 3,
        stock: true,
      },
      {
        name: '二乙二醇二苯甲酸矾',
        price: 649.99,
        rating: 3,
        stock: true,
      },
      {
        name: '塑料土工格室条带排水孔制造模具',
        price: 1499.99,
        rating: 4,
        stock: true,
      },
      {
        name: '石墨电极双螺纹梳加工机床',
        price: 299.99,
        rating: 4,
        stock: false,
      },
    ],


  }),
}

</script>
