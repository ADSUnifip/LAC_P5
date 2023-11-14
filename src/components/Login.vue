<template> 
    <div id="home" class="container-fluid">
    <div id="div_form_login" class="box">
        <img  id="image" src="../assets/logo_biolab.png" alt="logo"> 
        <form id="login" @submit.prevent="fazerLogin">
            <label for="email" class="form-label">Email</label>
            <input name="senha" type="email" id="email" class="form-control" placeholder="name@example.com" v-model="email">
            <label for="senha" class="form-label">Senha</label>
            <input  name="senha" id="senha" type="password" class="form-control" v-model="senha">
            <button type="submit" id="entrar" class="btn btn-success">Entrar</button>
        </form>  
    </div>
    </div>
    
</template>

<script>
import axios from 'axios'  
export default{
    data(){
        return{
            email:'',
            senha:''
        }
    },
   
    methods:{
        async fazerLogin(){
                const formdata = new FormData();
                formdata.append('email',this.email)
                formdata.append('senha',this.senha)
                try {
                    const response = await axios.post(`http://localhost:8081/api/login`,formdata)
                    const token = response.data
                    localStorage.setItem('token', `Bearer ${token.tokenJWT}`)
                    this.$router.push('/inicio')
                    console.log(response.data);
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                }

            
           
        }
    }
           
}
    

</script>

<style scoped>

.container-fluid{
    -webkit-text-size-adjust: 100%;
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
    margin-left: 22%;
    margin-top: 20px;
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


</style>
