<template>
    <div style="height: 400px; width: 500px;">
        <el-steps :space="200" :active="1" finish-status="success" align="center">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>