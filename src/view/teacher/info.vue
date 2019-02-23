<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="显示/修改" >
            <el-form ref="form" :model="form" label-width="90px" style="width: 100vh; margin: 10px 0 10px 10px; ">
                <el-col class="line" :span="8">
                    <el-form-item label="教师编号">
                        <el-input v-model="form.tnum" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="真实姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="所教科目">
                        <el-input v-model="form.subject" disabled></el-input>
                    </el-form-item>

                    <!--<el-form-item label="所教科目" >-->
                        <!--<el-select v-model="subjectValue" disabled>-->
                            <!--<el-option-->
                                    <!--v-for="item in subjects"-->
                                    <!--:key="item.value"-->
                                    <!--:label="item.label"-->
                                    <!--:value="item.value" >-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                </el-col>

                <el-col class="line" :span="8" style="padding-left: 0px;">
                    <el-form-item label="QQ">
                        <el-input v-model="form.qq"></el-input>
                    </el-form-item>

                    <el-form-item label="WeChat">
                        <el-input v-model="form.wechat"></el-input>
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

                <el-col class="line" :span="7">
                    <el-form-item label="性别">
                        <el-select v-model="form.gender">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-col>

                <el-col>
                    <el-form-item label="介绍自己">
                        <el-input v-model="form.introduce"></el-input>
                    </el-form-item>

                    <el-form-item label="地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="updateTeacherInfo">保存</el-button>
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
                    tnum: '',
                    name: '',
                    qq: '',
                    wechat: '',
                    gender: '男',
                    subject: '',
                    birthday: '',
                    introduce: '',
                    address: ''
                },
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                genderValue: '',
                // subjects: [{
                //     value: '选项1',
                //     label: 'English'
                // }, {
                //     value: '选项2',
                //     label: 'Math'
                // }],
                // subjectValue: 'Math',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        methods: {
            updateTeacherInfo() {
                // 判断性别
                if (this.label === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }
                this.axios.put('/teacher/info', {
                    tnum: this.form.tnum,
                    name: this.form.name,
                    qq: this.form.qq,
                    wechat: this.form.wechat,
                    gender: this.genderValue,
                    subject: this.form.subject,
                    birthday: this.form.birthday,
                    city: this.form.address,
                    introduce: this.form.introduce
                })
                    .then(res => {
                        this.$message.success("修改个人信息成功")
                        this.init('')
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            }
        },
        mounted() {
            this.axios.get('/teacher/info')
                .then(res => {
                    // console.log(res)
                    this.form.tnum = res.data.tnum
                    this.form.name  = res.data.name
                    this.form.qq = res.data.qq
                    this.form.wechat = res.data.wechat
                    this.form.subject = res.data.subject
                    if(res.data.gender !== 'male') {
                        this.form.gender = '女'
                    }
                    this.form.birthday = res.data.birthday
                    this.form.introduce = res.data.introduce
                    this.form.address = res.data.city
                })
                .catch(err => {
                    this.$message.error(err.response.data.message)
                })
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