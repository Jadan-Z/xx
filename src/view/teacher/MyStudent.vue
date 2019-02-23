<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 50px;">
            <el-col :span = "3">
                <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="input10"
                        clearable>
                </el-input>
                <!--<el-button style="margin-top: 10px; float: left;" type="primary">添加课程</el-button>-->
            </el-col >
            <el-button style="margin-left: 30px; float: left;" type="primary" icon="el-icon-search">搜索</el-button>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%; padding-left: 20px;">

            <el-table-column
                    label="学生姓名"
                    width="180px">
                <template slot-scope="scope">
                    <span>{{ scope.row.stuName}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="课程标题"
                    width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column label="查看所有课时">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">发布</el-button>-->
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="danger"-->
                            <!--@click="handleDelete(scope.$index, scope.row)">取消</el-button>-->
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
                    stuName: '王小虎',
                    title: '标题一',
                    releaseTime: '上海市普陀区金沙江路 1518 弄'
                }],
                input10: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>


</style>
