<template>
    <el-container>
        <el-aside width="201px">
            <el-row class="tac" >
                <el-col :span="2">
                    <el-menu
                            style="height: 100vh; width: 200px;"
                            default-active="1"
                            class="el-menu-vertical-demo"
                            @select="menu_select"
                            background-color="#4f6071"
                            text-color="#fff"
                            active-text-color="#4890da">

                        <el-menu-item index="1" @click="info">
                            <i class="el-icon-document"></i>
                            <span slot="title">教师信息</span>
                        </el-menu-item>

                        <el-menu-item index="2" @click="publish">
                            <i class="el-icon-time"></i>
                            <span slot="title">发布课程</span>
                        </el-menu-item>

                        <el-menu-item index="3" @click="notice">
                            <i class="el-icon-service"></i>
                            <span slot="title">我的通知</span>
                        </el-menu-item>

                        <el-menu-item index="4" @click="lesson">
                            <i class="el-icon-bell"></i>
                            <span slot="title">我的课时</span>
                        </el-menu-item>

                        <!--<el-menu-item index="5" @click="mystudent" disabled>-->
                            <!--<i class="el-icon-view"></i>-->
                            <!--<span slot="title">我的学生</span>-->
                        <!--</el-menu-item>-->

                        <el-menu-item index="6" disabled>
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">我的工资</span>
                        </el-menu-item>

                        <el-menu-item index="7" @click="setting">
                            <i class="el-icon-setting"></i>
                            <span slot="title">账号设置</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
            <el-header style="padding-left: 0px; padding-right: 0px;">
                <el-breadcrumb style="font-size: 25px; padding-left:20px; padding-top: 15px; box-shadow: 0 0 8px BLack; height: 40px;">
                    <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        data () {
            return {
                title: ''
            }
        },
        methods: {
            menu_select(index) {
                switch (index) {
                    case '1':
                        this.title = "教师信息";break;
                    case '2':
                        this.title = "发布课程";break;
                    case '3':
                        this.title = "我的通知";break;
                    case '4':
                        this.title = "我的课时";break;
                    case '5':
                        this.title = "我的学生";break;
                    case '6':
                        this.title = "我的工资";break;
                    case '7':
                        this.title = "账号设置";break;
                }
            },
            info() {
                this.$router.push({
                    path: "/teacher/info",
                    query: {

                    }
                })
            },
            publish() {
                this.$router.push({
                    path: "/teacher/release",
                    query: {

                    }
                })
            },
            notice() {
                this.$router.push({
                    path: "/teacher/notice",
                    query: {

                    }
                })
            },
            lesson() {
                this.$router.push({
                    path: "/teacher/lesson",
                    query: {

                    }
                })
            },
            mystudent() {
                this.$router.push({
                    path: "/teacher/mystudent",
                    query: {

                    }
                })
            },
            setting() {
                this.$router.push({
                    path: "/teacher/setting",
                    query: {

                    }
                })
            }
        },
        created() {
            document.title='Booking System'
        }
    }
</script>

<style>
    .el-container {
        height: 100vh;
    }

    .el-header{
        /*background-color: #B3C0D1;*/
        background-color: #FFF;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #f0f0f0;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-menu-item span {
        font-size: 15px;
    }

    .el-menu-item {
        padding-right: 40px;
    }
</style>
