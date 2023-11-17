<template>
    <div> 
    <h1>Cadastro Colaborador</h1>
    <div id="formulario_paciente" class="p-5">
        <form class="formulario" @submit.prevent="salvarColab()">
            <span v-if="this.msg" class="erro pb-2 text-success text-center fs-1 text-break">{{ this.msg }}</span>
            <div class="row"> 
                <div class="col-md-4 col-12">
                    <label>Cpf</label>
                    <input type="text" class="form-control " v-model="cpf" placeholder="999.999.999.99" >
                    <span v-if="erro.cpf" class="erro text-danger text-break">{{ erro.cpf }}</span>
                </div>
                <div class="col-md-8 col-12">
                    <label>Nome Completo</label>
                    <input type="text" class="form-control" v-model="nome" placeholder="Nome Completo" >
                    <span v-if="erro.nome" class="erro text-danger text-break">{{ erro.nome }}</span>
                </div>
                <div class="col-md-6 col-12"> 
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="email" placeholder="meuemail@gmail.com">
                    <span v-if="erro.email" class="erro text-danger text-break">{{ erro.email }}</span>
                </div>
                <div class="col-md-6">
                    <label>Data de nascimento</label>
                    <input type="date" class="form-control" v-model="dataNascimento" >
                    <span v-if="erro.dataNascimento" class="erro text-danger text-break">{{ erro.dataNascimento }}</span>
                </div>
                <div class="col-md-6"> 
                    
                    <label>Sexo</label>
                    <select class="form-select" v-model="sexo">
                        <option :value="''" selected>Selecione o sexo</option>
                        <option :value="'M'">Masculino</option>
                        <option :value="'F'">Feminino</option>
                    </select>
                    <span v-if="erro.sexo" class="erro text-danger text-break">{{ erro.sexo }}</span>
                </div>
                <div class="col-md-6"> 
                        
                    <label>Telefone</label>
                    <input type="text" class="form-control" placeholder="(83)99999-9999" >
                </div>
                <div class="col-md-12"> 
                    <span></span>
                    <label>Endereço</label>
                    <input type="text" class="form-control" placeholder="Rua Clinica Biolab" >
                </div>
                <div class="col-md-6">
                    <span></span>
                    <label>Cep</label>
                    <input type="text" class="form-control" placeholder="0000000" >
                </div>
                <div class="col-md-6">
                    <label>Senha de Acesso</label>
                    <input type="text" class="form-control"  v-model="senha" placeholder="******" >
                    <span v-if="erro.senha" class="erro text-danger text-break">{{ erro.senha }}</span>
                </div>
                <div id="salvar"> 
                    <input type="submit" class="btn btn-success large" >
                </div>
            </div>  
        </form>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "CadastroColab",
  data() {
    return {
      nome: "",
      cpf: "",
      dataNascimento: "",
      sexo: "",
      email: "",
      senha: "",
      tipoUsuario: "PADRAO",
      msg: "",
      erro: {
        nome: "",
        cpf: "",
        dataNascimento: "",
        sexo: "",
        email: "",
        senha: "",
        tipoUsuario: "PADRAO",
      }
    };
  },
  methods: {
    async salvarColab() {
      const formdata = new FormData();
      formdata.append("nome", this.nome);
      formdata.append("cpf", this.cpf);
      formdata.append("dataNascimento", this.dataNascimento);
      formdata.append("sexo", this.sexo);
      formdata.append("email", this.email);
      formdata.append("senha", this.senha);
      formdata.append("tipoUsuario", this.tipoUsuario = "PADRAO");

      axios
        .post("http://localhost:8081/api/usuario", formdata)
        .then(({ data }) => {
          this.msg = "Colaborador Cadastrado com Sucesso!";
          this.limparFormulario()
        })
        .catch((error) => {
         console.log(error.response.data)
         const mensagensErro = error.response.data;
         mensagensErro.forEach((erro) => {
            if (erro.campo == "cpf"){
                console.log(erro.mensagem)
               this.erro.cpf = erro.mensagem
            }
            if (erro.campo == "nome"){
                console.log(erro.mensagem)
               this.erro.nome = erro.mensagem
            }
            if (erro.campo == "dataNascimento"){
                console.log(erro.mensagem)
               this.erro.dataNascimento = erro.mensagem
            }
            if (erro.campo == "cpf"){
                console.log(erro.mensagem)
               this.erro.cpf = erro.mensagem
            }
            if (erro.campo == "email"){
                console.log(erro.mensagem)
               this.erro.email = erro.mensagem
            }
            if (erro.senha == "cpf"){
                console.log(erro.mensagem)
               this.erro.senha = erro.mensagem
            }
              
            });
            
        });
        
    },
    limparFormulario() {
      // Resetar os valores para os estados iniciais
      this.nome = "";
      this.cpf = "";
      this.dataNascimento = "";
      this.sexo = "";
      this.email = "";
      this.senha = "";
      this.tipoUsuario = "PADRAO";
      this.erro = {
        nome: "",
        cpf: "",
        dataNascimento: "",
        sexo: "",
        email: "",
        senha: "",
        tipoUsuario: "PADRAO",
      };
    },
    
  },
};
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