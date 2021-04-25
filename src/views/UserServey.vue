<template>
    <div class="box">
        <el-form
            :model="user"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
        >
            <el-form-item
                label="账号："
                prop="account"
                :style="{ width: '300px' }"
            >
                <el-input
                    type=""
                    v-model="user.account"
                    autocomplete="off"
                    size="small"
                ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input
                    type=""
                    v-model="user.name"
                    autocomplete="off"
                    size="small"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
                <el-input
                    type="password"
                    v-model="user.pass"
                    autocomplete="off"
                    size="small"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
                <el-input
                    type="password"
                    v-model="user.checkPass"
                    autocomplete="off"
                    size="small"
                ></el-input>
            </el-form-item>
            <el-form-item label="查询密码问题：">
                <el-select
                    v-model="user.passIssue"
                    placeholder="请选择"
                    size="small"
                >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询密码答案:" prop="passAnswer">
                <el-input
                    type=""
                    v-model="user.passAnswer"
                    autocomplete="off"
                    size="small"
                ></el-input>
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                    type="date"
                    v-model="user.birthday"
                    size="small"
                    :editable="false"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="user.gender">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-checkbox-group v-model="user.hobby">
                <el-form-item label="请选择爱好：" prop="hobby">
                    <el-checkbox label="跳舞"></el-checkbox>
                    <el-checkbox label="旅游"></el-checkbox>
                    <el-checkbox label="唱歌"></el-checkbox>
                    <el-checkbox label="打球"></el-checkbox>
                </el-form-item>
            </el-checkbox-group>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">提交</el-button>
                <el-button size="small">重填</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts'>

import { defineComponent, ref, reactive } from 'vue'
// import { User } from '@/types/userServey'
import http from '@/utils/http'

interface User {
  account?: string,
  name?: string,
  pass?: string,
  checkPass?: string,
  passIssue?: string,
  passAnswer?: string,
  birthday?: string,
  gender?: string,
  hobby?: string[]
}
export default defineComponent({
    name: 'UserServey',
    components: {},

    setup() {
        const user = reactive<User>({
            account: '',
            name: '',
            pass: '',
            checkPass: '',
            passIssue: '',
            passAnswer: '',
            birthday: '',
            gender: '0',
            hobby: [],
        })

        const rules = reactive({
            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { required: true, max: 6, message: '工号或学号，不超过6位', trigger: 'change'}
            ],
            name: [
                { required: true, message: '请填写姓名', trigger: 'blur' },
                { required: true, max: 15, message: '不超过15字符', trigger: 'blur'}
            ],
            pass: [
                { required: true, min: 6 , max: 20, message: '6-20位', trigger: 'change'}
            ],
            checkPass: [
                { required: true, min: 6 , max: 20, message: '6-20位', trigger: 'change'}
            ],
            passAnswer: [
                { required: true, max: 30, message: '不超过30字符', trigger: 'blur'}
            ],
            birthday: [
                { required: true, message: '请选择出生日期', trigger: 'blur' }
            ]
        })

        const ruleForm = ref()
        console.log(ruleForm)

        const onSubmit = (): void => {
            if (!ruleForm.value) return
            ruleForm.value.validate((valid: boolean) => {
                console.log(valid)
                if (valid) {
                    console.log(user)
                }
            })
            // http.get('/version').then((res) => {
            //     console.log(res)
            // })
            
        }

        return {
            user,
            onSubmit,
            rules,
            ruleForm
        }
    },
})
</script>

<style lang="less" scoped>
.box {
    margin-left: 100px;
    width: 400px;
    border: #eeedf0 dashed 1px;
}
</style>