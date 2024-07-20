<template>
    <v-main class="bg-wrapper">
        <v-container>
            <v-card>
                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="mb-3">我的报告 / 创建专利报告</div>
                    <div class="mb-3">专利报告范围检索</div>
                    <div class="mb-3">填写你的筛选条件，我们将根据专利、文献，通过专利智能助手为你快速生成个性化专利报告。</div>
                </v-card-text>
            </v-card>

            <v-card class="input-card">
                <v-card-text class="text-medium-emphasis pa-6">
                    <div class="contain-box">
                        <div class="mb-3">筛选条件至少输入一项</div>
                        <!-- <v-row>
                            <v-col cols="4">
                                <v-list-subheader>数据类型</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    v-model="select"
                                    :items="items"
                                    item-title="state"
                                    item-value="abbr"
                                    label="Select"
                                    variant="outlined"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </v-col>
                        </v-row> -->

                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader>申请人</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                :model-value="applicant"
                                v-model="applicant"
                                variant="outlined"
                                ></v-text-field>
                                <input type="text" >

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader>专业行业</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                :model-value="industry"
                                v-model="industry"
                                variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader>地域</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                :model-value="area"
                                v-model="area"
                                variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader>技术关键字</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                :model-value="key"
                                v-model="key"
                                variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col cols="4">
                                <v-list-subheader>技术主题</v-list-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                model-value="10.00"
                                variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row> -->

                        <v-btn
                            class="text-none"
                            color="secondary"
                            size="x-large"
                            variant="flat"
                            @click="gotoGenerate"
                            block>
                            生成报告
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-container>
    </v-main>

</template>

<script setup>
import { onMounted, ref } from "vue";
import router from '@/router'

// const select = ref({ state: '技术背景和目标', abbr: 'patent_trend1' });
// const patent_trend1 = ref();
// const items =  [
//     { state: '技术背景和目标', abbr: 'patent_trend1' },
//     { state: '技术发展及衍变趋势分析', abbr: 'patent_trend2' },
//     { state: '申请人排名分析', abbr: 'patent_applicant' },
//     { state: '地域分布', abbr: 'patent_area' },
//     { state: '专利类型', abbr: 'patent_type' },
//     { state: '技术构成分析', abbr: 'patent_technology' },
//     { state: '集中度分析', abbr: 'patent_concentration' },
// ];
const industry = ref('印刷');
const area = ref('广东');
const key = ref(null);
const applicant = ref('');

const gotoGenerate = () => {
    const query = {
        message: encodeURIComponent(JSON.stringify({
            industry: industry.value,
            area: area.value,
            key: key.value,
            applicant: applicant.value,
        }))
    }
    router.push({ path: '/generate', query })
}

    onMounted(() => {
    });
</script>

<style lang="scss" scoped>
.bg-wrapper {
  background-color: #f1f2f6;
}
.input-card {
    margin-top: 30px;
}
.contain-box {
    width:  600px;
    margin: 0 auto;
}
</style>