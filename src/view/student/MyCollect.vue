<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 50px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="按教师查询"
                        v-model="keyword"
                        clearable>
                </el-input>
            </el-col >
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search" @click="collectSearch">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="教师编号"
                    width="120px">
                <template slot-scope="scope">
                    <span>{{ scope.row.tnum}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="姓名"
                    width="120px">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="所教科目"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.subject}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="评分"
                    width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.score}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="简介"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.introducation}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="handleDetails(scope.$index, scope.row)">-->
                        <!--<i class="el-icon-star-on"></i>-->
                    <!--</el-button>-->

                    <el-button type="text" @click="handleCollect(scope.$index, scope.row)">
                        <i class="el-icon-star-off"></i>
                    </el-button>

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
                    tnum: '',
                    name: '',
                    subject: '',
                    score: '',
                    introducation: ''
                }],
                keyword: ''
            }
        },
        methods: {
            // 初始化get方法, 每次操作完立即调用
            init(keyword) {
                this.axios.get('/student/collect', {
                    params: {
                        keyword: this.keyword
                    }
                })
                    .then(res => {
                        // console.log(res)
                        this.tableData  = res.data
                    })
                    .catch(error => {
                        this.$message.error(error.response.data.message)
                    })
            },
            // 搜索按钮
            collectSearch() {
                this.init(this.keyword)
            },
            // 取消收藏
            handleCollect(index, row) {
                this.$confirm('此操作将取消收藏该老师, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.axios.put('/student/collect', {
                            sid: row.sid,
                            tid: row.tid
                        })
                            .then(res => {
                                this.$message.success("取消收藏")
                                this.init()
                            })
                            .catch(error => {
                                this.$message.error(error.response.data.message)
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                });
            },
        },
        mounted() {
            this.init(this.keyword)
        }
    }
</script>

<style scoped>


</style>
