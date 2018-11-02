<template>
    <div style="background-color: #EEE; height: 650px; display: flex; align-items: center; justify-content: center;">
        <div></div>
        <div>
            <el-container style="width: 400px; height:450px; ">
                <!-- 标题 -->
                <el-header>
                    <h1>Booking System</h1>
                </el-header>

                <!-- 登录界面主体部分 -->
                <el-main>
                    <div>
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <h2>学生注册</h2>
                            <br/><br/>

                            <div>
                                <el-form-item label="账号" prop="account" style="width: 300px; font-weight:bold;" >
                                    <el-input v-model="ruleForm2.account" placeholder="请输入账号"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="pass" style="width: 300px; font-weight:bold;">
                                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass" style="width: 300px; font-weight:bold;">
                                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
                                </el-form-item>
                                <br/>

                                <el-form-item style="width: 300px;" size="small">
                                    <el-button type="primary" @click="submitForm('ruleForm2') === true" >提交</el-button>
                                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                    <el-button type="info" @click="jumpRegist()">去登录</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else if(value.length < 5 ) {
                        return callback(new Error('账号长度不能少于5位'));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(value.length < 6 ){
                        callback(new Error('密码长度不能少于6位'));
                    }
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    account: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    account: [
                        { validator: checkAccount, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            jumpRegist(){
                this.$router.push({ path: '/login'})
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("xxx")
                        alert('submit!');
                        // console.log('error submit!!');
                        // this.$router.push({ path: '/test'})
                        return true;
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>

<style scoped>
    .el-header {
        color: #333;
        text-align: center;
        font-size: 25px;
        background-color: #EEE;
    }

    .el-main {
        background-color: #FFF;
        color: #333;
        /* 设置圆角 */
        border-radius: 20px;
        /*设置高亮*/
        box-shadow: 0 0 8px #4E4E4E;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

</style>