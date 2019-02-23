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
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search" @click="appointmentCourse">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.date}}</span>
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
                    label="讲师"
                    width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课程标题"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseTitle}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课类"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.subject}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="上课工具"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.qq}} {{ scope.row.wechat}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="reservation(scope.$index, scope.row)">预约</el-button>

                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="handleDetails(scope.$index, scope.row)">收藏</el-button>-->

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
                    date: '',
                    beginAt: '',
                    endAt: '',
                    name: '',
                    courseTitle: '',
                    subject: '',
                    qq: '',
                    wechat: ''
                }],
                keyword: ''
            }
        },
        methods: {
            // 初始化get
            init(keyword) {
                this.axios.get('/student/release', {
                    params: {
                        keyword: this.keyword
                    }
                })
                    .then(res => {
                        this.tableData = res.data
                    })
                    .catch(err => {
                        this.$message.error(err.response.data.message)
                    })
            },
            // 关键字搜索
            appointmentCourse() {
                this.init(this.keyword)
            },
            // 预约
            reservation(index, row) {
                this.$confirm('是否确定预约该节课?', '提示', {
                    confirmButtonText: '确定预约',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.post('/student/release', {
                            id: row.id,
                            tid: row.tid
                        })
                            .then(res => {
                                this.$message.success("预约成功")
                                this.init('')
                            })
                            .catch(error => {
                                this.$message.error(error.response.data.message)
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                })
            }
        },
        mounted() {
            this.init(this.keyword)
        }
    }
</script>

<style scoped>


</style>
