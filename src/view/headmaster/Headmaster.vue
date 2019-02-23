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

                        <el-menu-item index="1" @click="btn_info()">
                            <i class="el-icon-document"></i>
                            <span slot="title">学员信息</span>
                        </el-menu-item>

                        <el-menu-item index="2" @click="notification" disabled>
                            <i class="el-icon-bell"></i>
                            <span slot="title">学员通知</span>
                        </el-menu-item>

                        <el-menu-item index="3">
                            <i class="el-icon-news"></i>
                            <span slot="title">课程管理</span>
                        </el-menu-item>

                        <el-menu-item index="4" @click="changeToemployee">
                            <i class="el-icon-view"></i>
                            <span slot="title">员工管理</span>
                        </el-menu-item>

                        <el-menu-item index="5" disabled>
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">财务管理</span>
                        </el-menu-item>

                        <el-menu-item index="6" @click="setting">
                            <i class="el-icon-setting"></i>
                            <span slot="title">系统设置</span>
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
                title: '学员信息'
            }
        },
        methods: {
            menu_select(index) {
                switch (index) {
                    case '1':
                        this.title = '学员信息';break;
                    case '2':
                        this.title = '学员通知';break;
                    case '3':
                        this.title = '课程管理';break;
                    case '4':
                        this.title = '员工管理';break;
                    case '5':
                        this.title = '财务管理';break;
                    case '6':
                        this.title = '系统设置';break;
                }
            },
            btn_info() {
                this.$router.push({
                    path: "/headmaster/stuManagement",
                    query: {

                    }
                })
            },
            notification() {
                this.$router.push({
                    path: "/headmaster/stuNotification",
                    query: {

                    }
                })
            },
            changeToemployee() {
              this.$router.push({
                  path: "/headmaster/empManagement",
                  query: {

                  }
              })
            },
            setting() {
                this.$router.push({
                    path: "/headmaster/setting",
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
