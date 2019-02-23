<template>
    <div>

    <el-table
            :data="tableData"
            style="width: 100%">

        <el-table-column
                label="课节号"
                width="180px">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="课程标题"
                width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="状态"
                width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.name}}</span>
            </template>
        </el-table-column>

        <el-table-column
                label="开始时间"
                width="180">
            <template slot-scope="scope">
                <span>{{ scope.row.address}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">提醒</el-button>
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
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
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
