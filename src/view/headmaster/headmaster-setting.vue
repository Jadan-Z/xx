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
                        </el-row>
                    </el-form-item>

                    <el-form-item label="登录密码" class="addBlod">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="form.password" disabled></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%" >
                        <el-form :model="form2" style="width: 90%;">
                            <el-form-item label="原密码" label-width="120px" >
                                <el-input type="password" v-model="form2.password" autocomplete="off" ></el-input>
                            </el-form-item>

                            <el-form-item label="新密码" label-width="120px">
                                <el-input v-model="form2.newPassword" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" label-width="120px">
                                <el-input v-model="form2.rePassword" autocomplete="off"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancleUpdatePwd">取 消</el-button>
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
                form: {
                    account: '',
                    password: ''
                },
                dialogFormVisible: false,
                form2: {
                    password: '',
                    newPassword: '',
                    rePassword: ''
                }
            }
        },
        methods: {
            // 初始化get
            init() {
                this.axios.get("/headmaster/settings")
                    .then(res => {
                        // console.log(res)
                        this.form.account = res.data.account
                        this.form.password = res.data.password
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            // 取消修改密码
            cancleUpdatePwd() {
                this.dialogFormVisible = false
                this.form2.password = ''
                this.form2.newPassword = ''
                this.form2.rePassword = ''
            },
            // 修改密码
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

                this.axios.put('/headmaster/settings-password', {
                    id: this.id,
                    password: this.form2.password,
                    newPassword: this.form2.newPassword,
                    rePassword: this.form2.rePassword
                })
                    .then(res => {
                        // console.log(res);
                        this.dialogFormVisible = false
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
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

    .addBlod {
        font-weight:bold;
    }

</style>