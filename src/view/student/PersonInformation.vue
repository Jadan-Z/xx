<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="个人信息" >
            <el-form ref="form" :model="form" label-width="80px" style="width: 100vh; margin: 10px 0 10px 10px; ">
                <el-col class="line" :span="8">
                    <el-form-item label="编号">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
                </el-col>

                <el-col class="line" :span="6">
                    <el-form-item label="性别">
                        <el-select v-model="value">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 130px;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col class="line" :span="10" style="padding-left: 50px;">
                    <el-form-item label="QQ">
                        <el-input v-model="form.qq"></el-input>
                    </el-form-item>

                    <el-form-item label="WeChat">
                        <el-input v-model="form.wechat"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="地址">
                        <el-input v-model="form.address" ></el-input>
                    </el-form-item>

                    <el-form-item label="介绍自己">
                        <el-input v-model="form.introduction"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
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
                    name: '',
                },
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                value: '男',

                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                value1: '',
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
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