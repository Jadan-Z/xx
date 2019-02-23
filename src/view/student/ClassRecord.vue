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
                <!--<el-button style="margin-top: 10px; float: left;" type="primary">添加课程</el-button>-->
            </el-col >
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search" @click="classRecordSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.classDate}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="开始-结束时间"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.beginAt}} - {{ scope.row.endAt }}</span>
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
                    label="讲师"
                    width="90">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.state === '1'">即将开始</span>
                    <span v-if="scope.row.state === '2'">进行中</span>
                    <span v-if="scope.row.state === '3'">已完成</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="评分"
                    width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.score }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleDetails(scope.$index, scope.row)">详情</el-button>

                    <el-button
                            size="mini"
                            type="primary"
                            @click="evaluate(scope.$index, scope.row)" v-if="scope.row.score === null">评论</el-button>

                    <el-button
                            size="mini"
                            type="primary"
                            v-else disabled>已评论</el-button>

                    <el-dialog title="对该节课的评价" :visible.sync="dialogFormVisible" width="40%" align="center">
                        <el-rate
                                v-model="evaluation"
                                show-text>
                        </el-rate>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="handleCancel">取 消</el-button>
                            <el-button type="primary" @click="confirmEval">确定评价</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="课程详情" :visible.sync="dialogFormVisibleDetail" style="height: 100%;" width="60%" align="center">
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
                    classDate: '',
                    beginAt: '',
                    endAt: '',
                    courseNo: '',
                    name: '',
                    courseTitle: '',
                    state: '',
                    score: ''
                }],
                keyword: '',
                dialogFormVisible: false,
                evaluation: null,
                tempId: '',
                tempTid: '',
                dialogFormVisibleDetail: false,
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
                courseSpeed: null,
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/student/classRecord', {
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
            // 上课记录关键字搜索
            classRecordSearch() {
                this.init(this.keyword)
            },
            // 详情
            handleDetails(index, row) {
                this.dialogFormVisibleDetail = true

                this.axios.get('/student/classRecord/' + row.id)
                    .then(res => {
                        console.log(res)

                        this.form.cno = res.data.courseNo
                        this.form.title = res.data.courseTitle
                        this.form.name = res.data.name
                        this.form.qq = res.data.qq
                        this.form.wechat = res.data.wechat
                        this.form.classDate = res.data.classDate
                        this.form.classBeiginAt = res.data.beginAt
                        this.form.classEndAt = res.data.endAt
                        this.courseSpeed = Number(res.data.state)

                        if(res.data.score === null) {
                            this.form.score = '尚未评价'
                        } else {
                            this.form.score = res.data.score
                        }

                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 关闭按钮
            shutdown() {
                this.dialogFormVisibleDetail = false
            },
            // 评论按钮
            evaluate(index, row) {
                console.log(index, row)
                this.dialogFormVisible = true
                this.tempId = row.id
                this.tempTid = row.tid
            },
            // 取消操作并清空数据
            handleCancel() {
                this.dialogFormVisible = false
                this.evaluation = null
                this.tempId = ''
                this.tempTid = ''
            },
            // 确定评价
            confirmEval() {
                // 判断评分是否0
                if(this.evaluation === 0) {
                    this.$message.error("请进行评价")
                    return
                }
                this.dialogFormVisible = false
                console.log(this.evaluation)
                this.axios.put('/student/evaluate/' + this.tempId, {
                    tid: this.tempTid,
                    score: this.evaluation
                })
                    .then(res => {
                        this.$message.success("完成评价")
                        this.init('')
                        this.evaluation = null
                        this.tempId = ''
                        this.tempTid = ''
                    })
                    .catch(err => {
                        this.$message.error(err.resposne.data.message)
                    })
            }
        },
        mounted() {
            // 初始化get
            this.init(this.keyword)
        }
    }
</script>

<style scoped>


</style>
