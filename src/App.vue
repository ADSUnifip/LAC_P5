<template>
   <div>
    <router-view></router-view>
  </div>
   
    
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'App',
  components:{
    Login
  },
  data(){
    return{
      
    }
  }
}
</script>

<style>
.padrao{
  
  min-height: 250px;
}

h1{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 38px;
}
</style>


