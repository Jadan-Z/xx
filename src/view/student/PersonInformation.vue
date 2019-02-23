<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="显示/修改" >
            <el-form ref="form" :model="form" label-width="90px" style="width: 100vh; margin: 10px 0 10px 10px; ">
                <el-col class="line" :span="8">
                    <el-form-item label="编号">
                        <el-input v-model="form.stuNum" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col class="line" :span="8">
                    <el-form-item label="QQ">
                        <el-input v-model="form.qq"></el-input>
                    </el-form-item>

                    <el-form-item label="WeChat">
                        <el-input v-model="form.wechat"></el-input>
                    </el-form-item>
                </el-col>

                <el-col class="line" :span="7">
                    <el-form-item label="性别">
                        <el-select v-model="form.gender">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="选择日期"
                                style="width: 135px;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="介绍自己">
                        <el-input v-model="form.introduce"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="save">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    stuNum: '',
                    name: '',
                    qq: '',
                    wechat: '',
                    gender: '男',
                    birthday: '',
                    introduce: ''
                },
                genderValue: '',
                options: [{
                    gender: '选项1',
                    label: '男'
                }, {
                    gender: '选项2',
                    label: '女'
                }],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },

            }
        },
        methods: {
            // 封装get方法, 每次操作完立即调用(刷新页面)
            init() {
                this.axios.get("/student/info")
                    .then(res => {
                        // console.log(res)
                        this.form.stuNum = res.data.stuNum
                        this.form.name = res.data.realName
                        this.form.qq = res.data.qq
                        this.form.wechat = res.data.wechat
                        if(res.data.gender !== 'male') {
                            this.form.gender = '女'
                        }
                        this.form.birthday = res.data.birthday
                        this.form.introduce = res.data.introduce
                    })
                    .catch(error => {
                        this.$message.error(error.response.data.message)
                    })
            },
            // 修改信息
            save() {
                if(this.form.gender === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }
                this.axios.put('/student/info', {
                    stuNum: this.form.stuNum,
                    realName: this.form.name,
                    gender: this.genderValue,
                    birthday: this.form.birthday,
                    qq: this.form.qq,
                    wechat: this.form.wechat,
                    introduce: this.form.introduce
                })
                    .then(res => {
                        this.$message.success("修改成功")
                    })
                    .catch(error => {
                        this.$message.error(error.response.data.message)
                    })
                this.init()

            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .el-form-item .el-input {
        /*width: 20px;*/
    }

    .el-col {
        padding-left: 20px;
    }

</style>