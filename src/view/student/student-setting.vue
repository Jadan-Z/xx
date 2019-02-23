<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="修改系统设置" >
            <el-form :inline="false" ref="form" :model="form" label-width="120px" style="width: 120vh; margin: 10px 0px 10px 10px;">
                <el-col class="line" :span="10" >
                    <el-form-item label="登录账号" class="addBlod">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="form.account" disabled></el-input>
                            </el-col>
                            <!--<el-col :span="8">-->
                                <!--<el-button type="text" @click="dialogFormVisible1 = true">修改</el-button>-->
                            <!--</el-col>-->
                        </el-row>
                    </el-form-item>

                    <!--<el-dialog title="修改登录账号" :visible.sync="dialogFormVisible1" width="30%">-->
                        <!--<el-form :model="form1" style="width: 90%;">-->
                            <!--&lt;!&ndash;<el-form-item label="原用户名" label-width="120px">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-input v-model="form1.account1" autocomplete="off"></el-input>&ndash;&gt;-->
                            <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                            <!--<el-form-item label="新登录账号" label-width="120px">-->
                                <!--<el-input v-model="form1.account2" autocomplete="off"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->
                        <!--<div slot="footer" class="dialog-footer">-->
                            <!--<el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
                            <!--<el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>-->
                        <!--</div>-->
                    <!--</el-dialog>-->

                    <el-form-item label="密码" class="addBlod">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="form.password" disabled></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
                        <el-form :model="form2" style="width: 90%;">
                            <el-form-item label="原密码" label-width="120px">
                                <el-input v-model="form2.password" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="新密码" label-width="120px">
                                <el-input v-model="form2.newPassword" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" label-width="120px">
                                <el-input v-model="form2.rePassword" autocomplete="off"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                            <el-button type="primary" @click="updatePassword">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-col>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                id: '',
                form: {
                    account: '',
                    password: ''
                },
                dialogFormVisible1: false,
                form1: {

                },
                dialogFormVisible: false,
                form2: {
                    id: '',
                    password: '',
                    newPassword: '',
                    rePassword: ''
                }
            }
        },
        methods: {
            // 封装get方法, 每次操作完立即调用(刷新页面)
            init() {
                this.axios.get('/student/settings')
                    .then(res => {
                        // 200 相应结果
                        // console.log(res);
                        this.id = res.data.id
                        this.form.account = res.data.account
                        this.form.password = res.data.password
                    })
                    .catch(error => {
                        // 除200外的提示
                        this.$message.error(error.response.data.message)
                    })
            },
            updatePassword() {
                // 判断是否为空字符
                if(this.form2.password.trim() === '') {
                    this.$message.error('原密码不可为空')
                    return
                }

                if(this.form2.newPassword.trim() === '') {
                    this.$message.error('新密码不可为空')
                    return
                }

                if(this.form2.rePassword.trim() === '') {
                    this.$message.error('确认密码不可为空')
                    return
                }

                this.dialogFormVisible = false
                this.axios.put('/student/settings', {
                    id: this.id,
                    password: this.form2.password,
                    newPassword: this.form2.newPassword,
                    rePassword: this.form2.rePassword
                })
                    .then(res => {
                        // 200 相应结果
                        // console.log(res);
                        this.$message.success("修改密码成功")
                        this.form2.password = ''
                        this.form2.newPassword = ''
                        this.form2.rePassword = ''
                        this.init()
                    })
                    .catch(error => {
                        this.$message.error(error.response.data.message)
                    });
            }
        },
        // 异步函数也就意味着该函数的执行不会阻塞后面代码的执行，async 函数返回的是一个promise 对象。
        async mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .el-form-item .el-input {
        /*width: 20px;*/
    }

    .el-col {
        /*padding-left: 20px;*/
    }

    .addBlod {
        font-weight:bold;
    }

</style>