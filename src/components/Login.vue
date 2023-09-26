<template> 
    <div id="home" class="container-fluid">
    <div id="div_form_login" class="box">
        <img  id="image" src="../assets/logo_biolab.png"> 
        <form id="login" @submit="fazerLogin()">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="name@example.com">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" >
            <button type="submit" id="entrar" class="btn btn-success">Entrar</button>
        </form>
    </div>
    </div>
    
</template>

<script>

export default{
    name: 'Login',
    components:{
        
    },
    methods:{
        fazerLogin(){
           
        }
    }
}
</script>

<style scoped>

.container-fluid{
    width: 100%;
    background-color: #B4C2B4;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    position: fixed;
}

.box{
    padding: 10px;
    display: grid;
    width:350px;
    height: 400px;
    background-color: #B4C2B4;
    border-radius: 10px;
    border: solid 1px blanchedalmond;
}
.box #login #entrar{
    align-items: center;
    margin: 10px;
    width: 50%;

}

.box #login{
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

.box #image{
    width:330px;
    height: 150px;
}
#entrar{
    
}

</style>
