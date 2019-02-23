<template>
    <div>
        <div style="background-color: #FFF; padding: 15px 0 10px 30px; width: 97.3%; height: 400px;">
            <el-col :span = "1">
                <el-button style="margin-top: 10px; float: left;" type="primary">充值</el-button>
                <img src="../../../public/WePay.png" width="400px" height="500px" style="float: left; clear: both;"/>
                <img src="../../../public/AliPay.png" width="400px" height="500px" style="float: left; clear: both;"/>
            </el-col >
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    time1: '13:30',
                    time2: '15:30',
                    title: '王小虎',
                    releaseTime: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    time1: '13:30',
                    time2: '15:30',
                    title: '王小虎',
                    releaseTime: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    time1: '13:30',
                    time2: '15:30',
                    title: '王小虎',
                    releaseTime: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    time1: '13:30',
                    time2: '15:30',
                    title: '王小虎',
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
