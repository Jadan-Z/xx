<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 50px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="keyword"
                        clearable>
                </el-input>
            </el-col >
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search" @click="myLessonSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="日期"
                    width="120px">
                <template slot-scope="scope">
                    <span>{{ scope.row.classDate}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="开始-结束时间"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.startAt}} - {{ scope.row.endAt}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课节号"
                    width="100px">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseNo}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课程标题"
                    width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseTitle}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="学生姓名"
                    width="130">
                <template slot-scope="scope">
                    <span>{{ scope.row.realName}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.state === '1'">即将开始</span>
                    <span v-if="scope.row.state === '2'">进行中</span>
                    <span v-if="scope.row.state === '3'">已完成</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="评分"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.score}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="myLessonDetail(scope.$index, scope.row)">详情</el-button>

                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleDetails(scope.$index, scope.row)" disabled>标记</el-button>

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
                            <el-button type="primary" disabled>标记</el-button>

                            <br/>

                            <el-form-item label="QQ" label-width="80px">
                                <el-input v-model="form.qq" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="WeChat" label-width="80px">
                                <el-input v-model="form.wechat" style="width: 130px;"></el-input>
                            </el-form-item>

                            <el-form-item label="评分：" label-width="80px">
                                <label style="width: 130px; font-weight: bold;">{{form.score}}</label>
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
                    realName: '',
                    classDate: '',
                    startAt: '',
                    endAt: '',
                    state: '',
                    score: ''
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
                    classEndAt: '',
                    score: ''
                },
                courseSpeed: null
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/teacher/lesson', {
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
            myLessonSearch() {
                this.init(this.keyword)
            },
            // 详情
            myLessonDetail(index, row) {
                // console.log(index, row);
                this.axios.get('/teacher/notice-details/' + row.id)
                    .then(res => {
                        // console.log(res)
                        this.dialogFormVisible = true

                        this.form.cno = res.data.courseNo
                        this.form.title = res.data.courseTitle
                        this.form.name = res.data.name
                        this.form.qq = res.data.qq
                        this.form.wechat = res.data.weChat
                        this.courseSpeed = Number(res.data.state)
                        this.form.classDate = res.data.classDate
                        this.form.classBeiginAt = res.data.classBeiginAt
                        this.form.classEndAt = res.data.classEndAt

                        if(res.data.score === null) {
                            this.form.score = '学生未评价'
                        } else {
                            this.form.score = res.data.score
                        }

                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 关闭
            shutdown() {
                this.dialogFormVisible = false
                this.form.cno = ''
                this.form.title = ''
                this.form.name = ''
                this.form.qq = ''
                this.form.wechat = ''
                this.courseSpeed = null
                this.form.classDate = ''
                this.form.classBeiginAt = ''
                this.form.classEndAt = ''
            },
            handleDetails(index, row) {
                console.log(index, row);
            }
        },
        mounted() {
            this.init('')
        }
    }
</script>

<style scoped>


</style>
