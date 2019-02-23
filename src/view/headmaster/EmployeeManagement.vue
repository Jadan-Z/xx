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
                <el-button style="margin-top: 10px; float: left;" type="primary" @click="dialogFormVisible = true">添加教师</el-button>

                <el-dialog title="添加教师" :visible.sync="dialogFormVisible" style="height: 100%;" width="60%">
                    <el-form :model="form" style="width: 90%;" :inline="true">
                        <el-form-item label="真实姓名" label-width="80px">
                            <el-input v-model="form.name" style="width: 150px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="所教科目" label-width="80px">
                            <el-select v-model="form.subject" style="width: 120px;">
                                <el-option
                                v-for="item in subjects"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label" >
                                </el-option>
                            </el-select>
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

                        <el-form-item label="登录账号" label-width="80px">
                            <el-input v-model="form.account" label-width="80px" style="width: 130px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="所在城市" label-width="80px">
                            <el-input v-model="form.city" style="width: 120px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="出生日期" label-width="80px">
                            <el-date-picker
                                    v-model="form.birthday"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 140px;">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="登录密码" label-width="80px">
                            <el-input v-model="form.password" placeholder="默认密码" style="width: 130px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="QQ" label-width="80px">
                            <el-input v-model="form.qq" style="width: 130px;"></el-input>
                        </el-form-item>

                        <el-form-item label="WeChat" label-width="80px">
                            <el-input v-model="form.wechat" style="width: 130px;"></el-input>
                        </el-form-item>

                        <el-form-item label="介绍自己" label-width="80px">
                            <el-input v-model="form.introduce" style="width: 570px;"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="cancelAddTeacher" align="center">取消</el-button>
                    <el-button type="primary" @click="addTeacher()" align="center">添加</el-button>
                </el-dialog>
            </el-col >
            <el-button style="margin-left: 50px; float: left;" type="primary" icon="el-icon-search" @click="empSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%">

            <el-table-column
                    label="编号"
                    width="80px">
                <template slot-scope="scope">
                    <span>{{ scope.row.tno}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="性别"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.gender === 'male'">男</span>
                    <span v-else="">女</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="出生年月"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.birthDate}} {{scope.row.birthTime}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="评分"
                    width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.score}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="handleDetails(scope.$index, scope.row)" disabled>详情</el-button>-->
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    <el-dialog title="教师详情" :visible.sync="dialogFormVisibleDetail" style="height: 100%;" width="60%" align="center">
                        <el-form :model="form2" style="width: 90%;" :inline="true">
                            <el-form-item label="真实姓名" label-width="80px">
                                <el-input v-model="form2.name" style="width: 150px;" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="所教科目" label-width="80px">
                                <el-select v-model="form2.subject" style="width: 120px;">
                                    <el-option
                                            v-for="item in subjects"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label" >
                                    </el-option>
                                </el-select>
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

                            <el-form-item label="登录账号" label-width="80px">
                                <el-input v-model="form2.account" label-width="80px" style="width: 130px;" autocomplete="off" disabled></el-input>
                            </el-form-item>

                            <el-form-item label="所在城市" label-width="80px">
                                <el-input v-model="form2.city" style="width: 120px;" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="出生日期" label-width="80px">
                                <el-date-picker
                                        v-model="form2.birthday"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width: 140px;">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="登录密码" label-width="80px">
                                <el-input v-model="form2.password" placeholder="******" style="width: 130px;" autocomplete="off" disabled></el-input>
                            </el-form-item>

                            <el-form-item label="QQ" label-width="80px">
                                <el-input v-model="form2.qq" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="WeChat" label-width="80px">
                                <el-input v-model="form2.wechat" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="介绍自己" label-width="80px">
                                <el-input v-model="form2.introduce" style="width: 570px;"></el-input>
                            </el-form-item>
                        </el-form>

                        <el-button type="primary" @click="cancelUpdateTeacherInfo" >取消</el-button>
                        <el-button type="primary" @click="updateTeacherInfo" >保存修改</el-button>
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
                    id: '',
                    tno: '',
                    gender: '',
                    birthDate: '',
                    birthTime: '',
                    name: '',
                    score: ''
                }],
                keyword: '',
                dialogFormVisible: false,
                form: {
                    name: '',
                    subject: '',
                    gender: '男',
                    account: '',
                    city: '',
                    birthday: '',
                    password: '',
                    qq: '',
                    wechat: '',
                    introduce: '',
                },
                subjects: [{
                    value: '选项1',
                    label: 'English'
                }, {
                    value: '选项2',
                    label: 'Math'
                }, {
                    value: '选项3',
                    label: 'programmer'
                }],
                subjectValue: 'Math',
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                genderValue: '',
                dialogFormVisibleDetail: false,
                form2: {
                    name: '',
                    subject: '',
                    gender: '男',
                    account: '',
                    city: '',
                    birthday: '',
                    password: '',
                    qq: '',
                    wechat: '',
                    introduce: '',
                },
                tempId: ''
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/headmaster/allTeacher', {
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
            empSearch() {
                this.init(this.keyword)
            },
            // 取消添加教师
            cancelAddTeacher() {
                this.dialogFormVisible = false
                this.form.name = ''
                this.form.subject = ''
                this.form.gender = ''
                this.form.account = ''
                this.form.city = ''
                this.form.birthday = ''
                this.form.password = ''
                this.form.qq = ''
                this.form.wechat = ''
                this.form.introduce = ''
            },
            // 添加教师
            addTeacher() {
                if(this.form.account === '') {
                    this.$message.error("账号为必填项")
                    return
                }

                if(this.form.subject === '') {
                    this.$message.error("所教科目为必选项")
                    return
                }

                if (this.form.gender === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }
                this.axios.post('/headmaster/addTeacher', {
                    name: this.form.name,
                    subject: this.form.subject,
                    gender: this.genderValue,
                    account: this.form.account,
                    city: this.form.city,
                    birthday: this.form.birthday,
                    password: this.form.password,
                    qq: this.form.qq,
                    weChat: this.form.wechat,
                    introducation: this.form.introduce
                })
                    .then(res => {
                        this.dialogFormVisible = false
                        this.$message.success("添加教师成功")
                        this.init('')
                        this.form.name = ''
                        this.form.subject = ''
                        // this.form.gender = ''
                        this.form.account = ''
                        this.form.city = ''
                        this.form.birthday = ''
                        this.form.password = ''
                        this.form.qq = ''
                        this.form.wechat = ''
                        this.form.introduce = ''
                        this.genderValue = ''
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 查看详情
            handleEdit(index, row) {
                // console.log(index, row);
                this.dialogFormVisibleDetail = true
                this.tempId = row.id
                this.axios.get('/headmaster/teacherInfo/' + this.tempId)
                    .then(res => {
                        console.log(res)
                        this.form2.name = res.data.name
                        this.form2.subject = res.data.subject

                        if(res.data.gender !== 'male') {
                            this.form2.gender = '女'
                        }
                        this.form2.account = res.data.account
                        this.form2.city = res.data.city
                        this.form2.birthday = res.data.birthday
                        this.form2.qq = res.data.qq
                        this.form2.weChat = res.data.weChat
                        this.form2.introducation = res.data.introducation
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 取消保存修改
            cancelUpdateTeacherInfo() {
                this.dialogFormVisibleDetail = false
                this.form2.name = ''
                this.form2.subject = ''
                this.form2.gender = ''
                this.form2.account = ''
                this.form2.city = ''
                this.form2.birthday = ''
                this.form2.password = ''
                this.form2.qq = ''
                this.form2.wechat = ''
                this.form2.introduce = ''
            },
            // 修改教师信息
            updateTeacherInfo() {
                if(this.form2.subject === '') {
                    this.$message.error("所教科目为必选项")
                    return
                }

                if(this.form2.gender === '男') {
                    this.genderValue = 'male'
                } else {
                    this.genderValue = 'female'
                }

                this.axios.put('/headmaster/teacherInfo/' + this.tempId, {
                    name: this.form2.name,
                    subject: this.form2.subject,
                    gender: this.genderValue,
                    city: this.form2.city,
                    birthday: this.form2.birthday,
                    qq: this.form2.qq,
                    weChat: this.form2.wechat,
                    introduce: this.form2.introduce
                })
                    .then(res => {
                        this.dialogFormVisibleDetail = false
                        this.$message.success("已修改教师信息")
                        this.init('')
                        this.form2.name = ''
                        this.form2.subject = ''
                        this.form2.gender = ''
                        this.form2.account = ''
                        this.form2.city = ''
                        this.form2.birthday = ''
                        this.form2.password = ''
                        this.form2.qq = ''
                        this.form2.wechat = ''
                        this.form2.introduce = ''
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            handleDelete(index, row) {
                // console.log(index, row);
                this.$confirm('此操作将删除该教师, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.delete('/headmaster/delTeacher/' + row.id)
                            .then(res => {
                                this.$message.success("删除成功")
                                this.init('')
                            })
                            .catch(err => {
                                this.$message.error(err.response.data.message)
                            })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
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
