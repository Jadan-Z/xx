<template>
    <div>
        <el-row class="tac" >
            <el-col :span="2">
                <el-menu
                        style="height: 100vh; width: 200px;"
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#4f6071"
                        text-color="#fff"
                        active-text-color="#4890da">

                    <el-menu-item index="1">
                        <i class="el-icon-document"></i>
                        <span slot="title">学员信息</span>
                    </el-menu-item>

                    <el-menu-item index="2">
                        <i class="el-icon-bell"></i>
                        <span slot="title">学员通知</span>
                    </el-menu-item>

                    <el-menu-item index="3">
                        <i class="el-icon-news"></i>
                        <span slot="title">课程管理</span>
                    </el-menu-item>

                    <el-menu-item index="4">
                        <i class="el-icon-view"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>

                    <el-menu-item index="5">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">财务管理</span>
                    </el-menu-item>

                    <el-menu-item index="6">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        methods: {
            // handleOpen(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // }
        }
    }
</script>

<style scoped>
    .tac {
        header-row-style: "height: 80px";
        row-style: "height: 80px";
    }

    span {
        font-size: 15px;
    }

    .el-menu-item {
        padding-right: 40px;
    }

</style>