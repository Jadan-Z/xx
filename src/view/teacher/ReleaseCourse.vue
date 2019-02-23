<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 80px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="keyword"
                        clearable>
                </el-input>
                <el-button style="margin-top: 10px; float: left;" type="primary" @click="dialogFormVisible = true">添加课程</el-button>

                <el-dialog title="添加课程" :visible.sync="dialogFormVisible" style="height: 100%;" width="60%">
                    <el-form :model="form" style="width: 90%;" :inline="true">
                        <el-form-item label="课程标题" label-width="80px">
                            <el-input v-model="form.title" style="width: 150px;" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="所教科目" label-width="80px">
                            <el-input v-model="form.subject" style="width: 120px;" placeholder="查看教师信息" disabled></el-input>
                        </el-form-item>

                        <el-form-item label="" label-width="80px">
                            <el-switch
                                    v-model="form.state"
                                    inactive-text="发布课程"
                                    active-color="#409EFF"
                                    style="width: 110px;">
                            </el-switch>
                        </el-form-item>

                        <el-form-item label="上课时间" label-width="70px">
                            <el-date-picker
                                    v-model="form.classDate"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width: 150px;">
                            </el-date-picker>
                            &nbsp;
                            <el-time-select
                                    placeholder="起始时间"
                                    v-model="form.startAt"
                                    :picker-options="{
                                      start: '08:30',
                                      step: '00:15',
                                      end: '18:30'
                                    }" style="width: 150px;">
                            </el-time-select>
                            &nbsp;
                            <el-time-select
                                    placeholder="结束时间"
                                    v-model="form.endAt"
                                    :picker-options="{
                                      start: '08:30',
                                      step: '00:15',
                                      end: '18:30',
                                      minTime: form.startAt
                                     }" style="width: 150px;">
                            </el-time-select>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="cancelRelease" align="center">取消</el-button>
                    <el-button type="primary" @click="addCourse" align="center">添加</el-button>
                </el-dialog>
            </el-col >
            <el-button style="margin-left: 50px; float: left;" type="primary" icon="el-icon-search" @click="releaseCourseSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="日期"
                    width="180px">
                <template slot-scope="scope">
                    <span>{{ scope.row.beginAt.substring(0, 10)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="开始-结束时间"
                    width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.beginAt !== null">{{ scope.row.beginAt.substring(11, 16)}} - {{ scope.row.endAt.substring(11, 16)}}</span>
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
                    label="发布时间"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.addAt}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="handleDetails(scope.$index, scope.row)">详情</el-button>-->
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)" disabled>发布</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    beginAt: '',
                    endAt: '',
                    courseTitle: '',
                    addAt: ''
                }],
                keyword: '',
                dialogFormVisible: false,
                form: {
                    title: '',
                    subject: '',
                    state: true,
                    classDate: '',
                    startAt: '',
                    endAt: '',
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/teacher/notReserved', {
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
            releaseCourseSearch() {
                this.init(this.keyword)
            },
            // 取消添加课程
            cancelRelease() {
                this.dialogFormVisible = false
                this.form.title = ''
                this.form.subject = ''
                this.form.classDate = ''
                this.form.startTime = ''
                this.form.endTime = ''
            },
            // 添加课程
            addCourse() {
                if(this.form.title === '' || this.form.title.length < 6) {
                    this.$message.error("课程标题为必填项, 且长度至少为6位")
                    return
                }

                if(this.form.classDate === '' || this.form.classDate === null) {
                    this.$message.error("上课日期为必选项")
                    return
                }

                if(this.form.startAt === '') {
                    this.$message.error("开始时间为必选项")
                    return
                }

                if(this.form.endAt === '') {
                    this.$message.error("结束时间为必选项")
                    return
                }
                this.axios.post('/teacher/release', {
                    courseTitle: this.form.title,
                    classAt: this.form.classDate,
                    startAt: this.form.startAt,
                    endAt: this.form.endAt,
                    state: this.form.state
                })
                    .then(res => {
                        this.$message.success("添加课程成功")
                        this.init('')

                        this.dialogFormVisible = false
                        this.form.title = ''
                        this.form.subject = ''
                        this.form.classDate = ''
                        this.form.startTime = ''
                        this.form.endTime = ''
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('确定删除该节课, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.delete('/teacher/notReserved/' + row.id)
                            .then(res => {
                                this.$message.success("删除成功")
                                this.init('')
                            })
                            .catch(error => {
                                this.$message.error(error.response.data.message)
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
