<template>
    <el-tabs type="border-card" >
        <el-tab-pane label="修改系统设置" >
            <el-form ref="form" :model="form" label-width="100px" style="width: 100vh; margin: 10px 0px 10px 10px; ">
                <el-col class="line" :span="10" >
                    <el-form-item label="编号:" class="addBlod">
                        <el-input v-model="form.name" style="padding-left: 50px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户名:" class="addBlod">
                        <el-input v-model="form.account" style="padding-left: 50px;"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" class="addBlod">
                        <el-input v-model="form.password" style="padding-left: 50px;"></el-input>
                    </el-form-item>
                </el-col>

                <el-col style="padding-left: 150px;">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    .el-form-item .el-input {
        /*width: 20px;*/
    }

    .el-col {
        padding-left: 20px;
    }

    .addBlod {
        font-weight:bold;
    }
</style>