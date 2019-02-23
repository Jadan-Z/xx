<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 50px 30px; width: 97.3%; height: 50px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="keyword"
                        clearable>
                </el-input>
                <el-button style="margin-top: 10px; float: left;" type="primary" @click="dialogFormVisible = true">添加学生</el-button>

                <el-dialog title="添加学生" :visible.sync="dialogFormVisible" style="height: 100%;" width="60%">
                    <el-form :model="form" style="width: 90%;" :inline="true">
                        <el-form-item label="登录账号" label-width="80px">
                            <el-input v-model="form.account" label-width="80px" style="width: 130px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="QQ" label-width="80px">
                            <el-input v-model="form.qq" style="width: 130px;"></el-input>
                        </el-form-item>

                        <el-form-item label="WeChat" label-width="80px">
                            <el-input v-model="form.wechat" style="width: 130px;"></el-input>
                        </el-form-item>

                        <el-form-item label="登录密码" label-width="80px">
                            <el-input v-model="form.password" label-width="130px" placeholder="默认密码" style="width: 130px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="性别" label-width="80px">
                            <el-select v-model="form.gender" style="width: 120px;">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="出生日期" label-width="80px">
                            <el-date-picker
                                    v-model="form.birthday"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 140px;">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="介绍自己" label-width="80px">
                            <el-input v-model="form.introduce" style="width: 580px;"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="cancelAddStudent" align="center">取消</el-button>
                    <el-button type="primary" @click="addStudent()" align="center">添加</el-button>
                </el-dialog>
            </el-col >
            <el-button style="margin-left: 50px; float: left;" type="primary" icon="el-icon-search" @click="studentSearch">搜索</el-button>
        </div>

    <el-table
            :data="tableData"
            style="width: 100%;">

        <el-table-column
                label="编号"
                width="100px">
            <template slot-scope="scope">
                <span>{{ scope.row.sno}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="账号"
                width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.account}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="姓名"
                width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="注册时间"
                width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.registerDate}} {{ scope.row.registerTime}}</span>
            </template>
        </el-table-column>



        <el-table-column
                label="上课工具"
                width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.qq}} {{ scope.row.weChat}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">详情</el-button>

                <el-button
                        size="mini"
                        type="primary"
                        @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>

                    <el-dialog title="学生详情" :visible.sync="dialogFormVisibleDetail" style="height: 100%; padding: 15px 0 50px 30px;" width="60%"  align="center">
                        <el-form :model="form2" style="width: 90%;" :inline="true">
                            <el-form-item label="登录账号" label-width="80px">
                                <el-input v-model="form2.account" style="width: 130px;" disabled autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="QQ" label-width="80px">
                                <el-input v-model="form2.qq" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="WeChat" label-width="80px">
                                <el-input v-model="form2.wechat" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="登录密码" label-width="80px">
                                <el-input v-model="form2.password" label-width="130px" placeholder="默认密码" style="width: 130px;" autocomplete="off" disabled></el-input>
                            </el-form-item>

                            <el-form-item label="性别" label-width="80px">
                                <el-select v-model="form2.gender" style="width: 120px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="出生日期" label-width="80px">
                                <el-date-picker
                                        v-model="form2.birthday"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width: 140px;">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="介绍自己" label-width="80px">
                                <el-input v-model="form2.introduce" style="width: 580px;"></el-input>
                            </el-form-item>
                        </el-form>

                        <div>
                            <el-button type="primary" @click="dialogFormVisibleDetail = false">取消</el-button>
                            <el-button type="primary" @click="updateStuInfo">保存修改</el-button>
                        </div>
                    </el-dialog>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    sno: '',
                    name: '',
                    qq: '',
                    weChat: '',
                    registerDate: '',
                    registerTime: '',
                    account: ''
                }],
                keyword: '',
                form: {
                    account: '',
                    qq: '',
                    wechat: '',
                    password: '',
                    gender: '男',
                    birthday: '',
                    introduce: ''
                },
                dialogFormVisible: false,
                form2: {
                    account: '',
                    qq: '',
                    wechat: '',
                    password: '******',
                    gender: '男',
                    birthday: '',
                    introduce: ''
                },
                dialogFormVisibleDetail: false,
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
                tempId: ''
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/headmaster/allStudent', {
                    params: {
                        keyword: keyword
                    }
                })
                    .then(res => {
                        // console.log(res)
                        this.tableData = res.data
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 关键字搜索
            studentSearch() {
                this.init(this.keyword)
            },
            // 取消添加学生
            cancelAddStudent() {
                this.dialogFormVisible = false
            },
            // 添加学生
            addStudent() {
                if (this.form.account === '') {
                    this.$message.error("账号为必填项")
                    return
                }

                if(this.form.gender === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }
                this.axios.post('/headmaster/addStudent', {
                    account: this.form.account,
                    password: this.form.password,
                    realName: this.form.name,
                    gender: this.genderValue,
                    birthday: this.form.birthday,
                    qq: this.form.qq,
                    weChat: this.form.wechat,
                    introduce: this.form.introduce
                })
                    .then(res => {
                        this.dialogFormVisible = false
                        this.$message.success("添加学生成功")
                        this.init('')
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 详情/编辑操作
            handleEdit(index, row) {
                // console.log(index, row);
                this.dialogFormVisibleDetail = true
                this.tempId = row.id
                this.axios.get('/headmaster/stuInfo/' + row.id)
                    .then(res => {
                        // console.log(res)
                        this.form2.account = res.data.account
                        this.form2.qq = res.data.qq
                        this.form2.wechat = res.data.weChat
                        this.form2.introduce = res.data.introduce
                        this.form2.birthday = res.data.birthday

                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 保存
            updateStuInfo() {
                if(this.form2.gender === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }
                // console.log(this.tempId)
                this.axios.put('/headmaster/stuInfo/' + this.tempId, {
                    gender: this.genderValue,
                    birthday: this.form2.birthday,
                    qq: this.form2.qq,
                    weChat: this.form2.wechat,
                    introduce: this.form2.introduce
                })
                    .then(res => {
                        this.$message.success("已修改学生信息")
                        this.dialogFormVisibleDetail = false
                        this.init('')
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 重置密码
            resetPwd(index, row) {
                this.$confirm('此操作将重置该学生登录密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.put('/headmaster/resetPwd/' + row.id)
                            .then(res => {
                                this.$message.success("重置密码成功")
                                this.init()
                            })
                            .catch(err => {
                                this.$message.error(err.response.data.message)
                            })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消重置'
                    });
                });

            }
        },
        mounted() {
            this.init(this.keyword)
        }
    }
</script>

<style scoped>


</style>
