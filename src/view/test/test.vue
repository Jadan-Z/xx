<template>
    <div id="app1">
        <my-component1></my-component1>
    </div>
</template>

<script>
import header1 from '../compoents/header.vue';
    export default {
        name: 'app1',
        components: {
            'my-component1': header1
        }
    }
</script>