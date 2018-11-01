<template>
  <div id="UserIndex">
    <br>
    <row><h1>tttt</h1></row>
    <row>
      <test></test>
    </row>
  </div>
</template>

<script>
  
  import test from './components/test';
  
  
  export default {
    name: "UserIndex",
    
    component: {
      'test': test,
    },
    
    data() {
      return {
      
        
      }
    }
  }
</script>

<style scoped>
  #UserIndex {
  
  }
</style>