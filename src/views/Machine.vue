<template>
    <div class="box">
        <el-form class="form">
            <el-form-item>
                <el-radio v-model="money" label="0.5">5角</el-radio>
                <el-radio v-model="money" label="1">1元</el-radio>
            </el-form-item>
            <el-form-item
                label="投入金额："
                prop="money"
                :style="{ width: '300px' }"
            >
                <el-input
                    type="text"
                    v-model="money"
                    class="money"
                    autocomplete="off"
                    size="small"
                    :style="{ width: '100px' }"
                    :disabled="true"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="purchaseBeer" class="btn1">啤酒</el-button>
                <el-button type="success" size="small" @click="purchaseJuice" class="btn2">橙汁</el-button>
            </el-form-item>
            <el-form-item
                label="找回金额："
                prop="changes"
                :style="{ width: '300px' }"
            >
                <el-input
                    type="text"
                    v-model="changes"
                    autocomplete="off"
                    size="small"
                    :style="{ width: '100px' }"
                    :disabled="true"
                    class="changes"
                ></el-input>
            </el-form-item>
            <div class="back">机器零钱是否找完：<div class="light" :style="{ 'background': lightColor }"></div></div>
            <hr>
            <el-tag type="primary" class="tag1">送出啤酒数量：{{ beerNum }}</el-tag>
            <el-tag type="success" class="tag2">送出橙汁数量：{{ juiceNum }}</el-tag>
        </el-form>
    </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue'

const JUICE_PRICE = 0.5
const BEER_PRICE = 0.5

export default defineComponent({
    name: '',
    components: {},

    setup() {
        const money = ref<number>(0)
        const moneyFlag = ref<boolean>(false)
        const changes = ref<number>(0)
        const machineMoney = ref<number>(2)
        const juiceNum = ref<number>(0)
        const beerNum = ref<number>(0)

        const purchaseBeer = () => {
            if (money.value >= BEER_PRICE && machineMoney.value >= changes.value && machineMoney.value !== 0) {
                beerNum.value++
                changes.value = money.value - BEER_PRICE
                console.log(money.value)
                if (money.value == 0.5) {
                    machineMoney.value -= Number(money.value)
                }
                money.value = money.value - BEER_PRICE
                if (machineMoney.value >= changes.value) {
                    machineMoney.value -= changes.value
                }
                
            }
        }

        const lightColor = computed(() => machineMoney.value < changes.value || machineMoney.value === 0 ? 'red' : '#fff')

        const purchaseJuice = () => {
            if (money.value >= JUICE_PRICE && machineMoney.value >= changes.value && machineMoney.value !== 0) {
                juiceNum.value++
                changes.value = money.value - JUICE_PRICE
                if (money.value == 0.5) {
                    machineMoney.value -= Number(money.value)
                }
                money.value = money.value - JUICE_PRICE
                if (machineMoney.value >= changes.value) {
                    machineMoney.value -= changes.value
                }
            }
        }

        watch(() => changes.value, (newVal, oldVal) => {
            // console.log('watch', newVal, oldVal)
            if (newVal === 0 && moneyFlag.value === false) {
                machineMoney.value -= oldVal
            }
        })

        watch(() => money.value, (newVal, oldVal) => {
            if (newVal == 1) {
                moneyFlag.value = true
            }
        })

        return {
            money,
            changes,
            juiceNum,
            beerNum,
            purchaseBeer,
            purchaseJuice,
            lightColor
        }
    },
})
</script>

<style scoped>
.box {
    margin: auto;
    margin-top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    border: #000 dashed 1px;
}
.light {
    width: 20px;
    height: 20px;
    border: #000 1px solid;
    border-radius: 50%;
}
.form {
    height: 300px;
}
.back {
    display: flex;
    justify-content: flex-start;
}
</style>