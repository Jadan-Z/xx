<template>
    <el-container>
        <el-aside width="201px">
            <el-row class="tac" >
                <el-col :span="2">
                    <el-menu
                            style="height: 100vh; width: 200px;"
                            default-active="1"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            @select="menu_select"
                            background-color="#4f6071"
                            text-color="#fff"
                            active-text-color="#4890da">

                        <el-menu-item index="1" @click="personInfo">
                            <i class="el-icon-document"></i>
                            <span slot="title">个人信息</span>
                        </el-menu-item>

                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">预约课程</span>
                        </el-menu-item>

                        <el-menu-item index="3">
                            <i class="el-icon-location"></i>
                            <span slot="title">我的预约</span>
                        </el-menu-item>

                        <el-menu-item index="4">
                            <i class="el-icon-loading"></i>
                            <span slot="title">上课记录</span>
                        </el-menu-item>

                        <el-menu-item index="5">
                            <i class="el-icon-goods"></i>
                            <span slot="title">购买课程</span>
                        </el-menu-item>

                        <el-menu-item index="6">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">收藏老师</span>
                        </el-menu-item>

                        <el-menu-item index="7">
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
    import header from '../compoents/header.vue';

    export default {
        data () {
            return {
                title: '个人信息'
            }
        },
        methods: {
            menu_select(index) {
                switch (index) {
                    case '1':
                        this.title = '个人信息';break;
                    case '2':
                        this.title = '预约课程';break;
                    case '3':
                        this.title = '我的预约';break;
                    case '4':
                        this.title = '上课记录';break;
                    case '5':
                        this.title = '购买课程';break;
                    case '6':
                        this.title = '收藏老师';break;
                    case '7':
                        this.title = '系统设置';break;
                }
            },
            personInfo(){
                this.$router.push({
                    path: "/student/personInfo",
                    query: {

                    }
                })
            }

        },
        components : {
            'myhead': header
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
