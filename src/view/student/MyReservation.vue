<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 50px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="模糊查询"
                        v-model="keyword"
                        clearable>
                </el-input>
            </el-col >
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search" @click="appointmentSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="课节号"
                    width="150px">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseNo}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课程标题"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseTitle}}</span>
                </template>
            </el-table-column>

            <el-table-column
            label="讲师"
            width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.state === '1'">即将开始</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="开始时间"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.beginAt}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleDetails(scope.$index, scope.row)">详情</el-button>

                    <el-dialog title="课程详情" :visible.sync="dialogFormVisible" style="height: 100%;" width="60%" align="center">
                        <el-form :model="form" style="width: 90%;" :inline="true">
                            <el-form-item label="课节号" label-width="80px">
                                <el-input v-model="form.cno" label-width="80px" style="width: 130px;" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="课程标题" label-width="80px">
                                <el-input v-model="form.title" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="讲师" label-width="80px">
                                <el-input v-model="form.name" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="上课时间：" label-width="160px">
                                <label style="font-size: 20px; font-weight: bold;">{{form.classDate}} </label>
                                <label style="font-size: 20px; font-weight: bold;">{{form.classBeiginAt}} ~ </label>
                                <label style="font-size: 20px; font-weight: bold;">{{form.classEndAt}}</label>
                            </el-form-item>
                            <el-button type="primary" disabled>更改上课时间</el-button>

                            <br/>

                            <el-form-item label="QQ" label-width="80px">
                                <el-input v-model="form.qq" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="WeChat" label-width="80px">
                                <el-input v-model="form.wechat" style="width: 130px;"></el-input>
                            </el-form-item>

                            <br/>
                            <label style="font-size: 20px; font-weight: bold;">课程进度</label>
                            <br/>
                            <div>
                                <el-steps :space="400" :active="courseSpeed" finish-status="success" style="width: 530px;" align-center>
                                    <el-step title="预约"></el-step>
                                    <el-step title="即将开始"></el-step>
                                    <el-step title="进行中"></el-step>
                                    <el-step title="已完成"></el-step>
                                </el-steps>
                            </div>
                        </el-form>
                        <br/>
                        <br/>
                        <br/>
                        <el-button type="primary" @click="shutdown" align="center">关闭</el-button>
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
                    courseNo: '',
                    courseTitle: '',
                    name: '',
                    beginAt: '',
                    state: ''
                }],
                keyword: '',
                dialogFormVisible: false,
                form: {
                    cno: '',
                    title: '',
                    name: '',
                    qq: '',
                    wechat: '',
                    classDate: '',
                    classBeiginAt: '',
                    classEndAt: ''
                },
                courseSpeed: 2
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/student/appointment', {
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
            appointmentSearch() {
                this.init(this.keyword)
            },
            // 详情操作
            handleDetails(index, row) {
                // console.log(index, row)
                this.dialogFormVisible = true
                this.axios.get('/student/appointment-details/' + row.id)
                    .then(res => {
                        console.log(res)
                        this.form.cno = res.data.courseNo
                        this.form.title = res.data.courseTitle
                        this.form.name = res.data.name
                        this.form.qq = res.data.qq
                        this.form.wechat = res.data.weChat
                        this.courseSpeed = Number(res.data.state)
                        this.form.classDate = res.data.classDate
                        this.form.classBeiginAt = res.data.classBeiginAt
                        this.form.classEndAt = res.data.classEndAt
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 关闭操作
            shutdown() {
                this.dialogFormVisible = false
                this.form.cno = ''
                this.form.title = ''
                this.form.name = ''
                this.form.qq = ''
                this.form.wechat = ''
                this.courseSpeed = 2
                this.form.classDate = ''
                this.form.classBeiginAt = ''
                this.form.classEndAt = ''
            }
        },
        mounted() {
            this.init(this.keyword)
        }
    }
</script>

<style scoped>


</style>
