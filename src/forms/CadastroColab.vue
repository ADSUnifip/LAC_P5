<template>
    <div> 
    <h1>Cadastro Colaborador</h1>
    <div id="formulario_paciente"> 
        <form class="formulario" @submit="salvarColab()">
            <div class="row"> 
                <div class="col-md-4 col-12">
                    <label>Cpf</label>
                    <input type="number" class="form-control" v-model="cpf" placeholder="999.999.999.99" required>
                </div>
                <div class="col-md-8 col-12">
                    <label>Nome Compel</label>
                    <input type="text" class="form-control" v-model="nome" placeholder="Nome Completo" required>
                </div>
                <div class="col-md-6 col-12"> 
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="email" placeholder="meuemail@gmail.com">
                </div>
                <div class="col-md-6">
                    <label>Data de nascimento</label>
                    <input type="date" class="form-control" v-model="dataNascimento" required>
                </div>
                <div class="col-md-6"> 
                    <label>Sexo</label>
                    <select class="form-select" v-model="sexo">
                        <option selected>Selecione o sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                </div>
                <div class="col-md-6"> 
                    <label>Telefone</label>
                    <input type="number" class="form-control" placeholder="(83)99999-9999" required>
                </div>
                <div class="col-md-12"> 
                    <label>Endereço</label>
                    <input type="text" class="form-control" placeholder="Rua Clinica Biolab" required>
                </div>
                <div class="col-md-6">
                    <label>Cep</label>
                    <input type="number" class="form-control" placeholder="0000000" required>
                </div>
                <div class="col-md-6">
                    <label>Senha de Acesso</label>
                    <input type="password" class="form-control" placeholder="Catolé do Rocha" required>
                </div>
                <div id="salvar"> 
                    <input type="submit" class="btn btn-success large">
                </div>
            </div>  
        </form>
</div>
</div>
</template>

<script>
export default{
    name: 'CadastroColab',
    data(){
        return{
           // A Construir
        }
    },
    methods:{
        salvarColab(){
            const formdata = new FormData();
                formdata.append('nome',this.Burguer.name_client)
                formdata.append('cpf',this.Burguer.bread)
                formdata.append('dataNascimento',this.Burguer.meat)
                formdata.append('sexo',this.Burguer.opcionais)
                formdata.append('email',this.Burguer.status)
                formdata.append('senha',this.Burguer.status)
                
                axios
                .post('http://localhost:8081/burguers/new',formdata)
            
                .then(({dados})=>{
                    this.msg="Pedido Realizado com Sucesso!"
                }).catch(({error})=>{
                    this.msg="Falha ao Salvar o Pedido"
                    console.log(error)
                })
                
        }
    }
}
</script>

<style scoped>

#salvar{
    align-items: baseline;
}

.col-md-6{
    margin: 8px auto;
}

.formulario{
    margin: 20px auto;
    padding: 10px 10px;
}

#formulario_paciente{
    background-color: #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    height: 80%;
}

</style>