<template>
    <div> 
    <h1>Cadastro Colaborador</h1>
    <div id="formulario_paciente" class="p-5 container">
        <form class="formulario" @submit.prevent="salvarColab()">
          <div style=" display: flex; justify-content: center;">
          </div>
            <div class="row"> 
                <div class="col-md-4 col-12">
                    <label>Cpf</label>
                    <input type="text" class="form-control " v-model="cpf" placeholder="999.999.999.99" v-mask="['###.###.###-##', '###.###.###-##']" >
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
                    <span></span>
                    <label for="cep">Cep</label>
                    <input type="text" id="cep" v-model="cep" @input="searchCep" class="form-control" placeholder="0000000" v-mask="['#####-###', '#####-###']" >
                    <span v-if="erro.endereco.cep" class="erro text-danger text-break">{{ erro.endereco.cep }}</span>
                </div>
                <div class="col-md-6">     
                    <label>Sexo</label>
                    <select class="form-select" v-model="sexo">
                        <option :value="''" selected></option>
                        <option :value="'M'">Masculino</option>
                        <option :value="'F'">Feminino</option>
                    </select>
                    <span v-if="erro.sexo" class="erro text-danger text-nowrap">{{ erro.sexo }}</span>
                </div>
                <div class="col-md-11"> 
                    <span></span>
                    <label>Rua</label>
                    <input type="text" class="form-control" v-model="endereco.rua" readonly>
                    <span v-if="erro.endereco.rua" class="erro text-danger text-nowrap">{{ erro.endereco.rua }}</span>
                </div>
                <div class="col-md-1"> 
                    <span></span>
                    <label>Numero</label>
                    <input type="text" class="form-control" v-model="endereco.numero">
                    <span v-if="erro.endereco.numero" class="erro text-danger text-nowrap">{{ erro.endereco.numero }}</span>
                </div>
                  <div class="row" style="justify-content: flex-start;">
                    <div class="col-md-6">
                        <span></span>
                        <label>Bairro</label>
                        <input type="text" class="form-control" placeholder=""  v-model="endereco.bairro" >
                        <span v-if="erro.endereco.bairro" class="erro text-danger text-break">{{ erro.endereco.bairro }}</span>
                    </div>
                    <div class="row col-md-6">
                        <div class="col-md-10">
                            <span></span>
                            <label>Cidade</label>
                            <input type="text" class="form-control" placeholder="" v-model="endereco.cidade" >
                            <span v-if="erro.endereco.cidade" class="erro text-danger text-nowrap">{{ erro.endereco.cidade}}</span>
                        </div>
                        <div class="col-md-2">
                            <span></span>
                            <label>Estado</label>
                            <input type="text" class="form-control" placeholder="" v-model="endereco.estado" >
                            <span v-if="erro.endereco.estado" class="erro text-danger text-nowrap">{{ erro.endereco.estado }}</span>
                        </div>
                    </div>
                  </div>
                  <div class="col-md-6">               
                    <label>Telefone</label>
                    <input type="text" class="form-control" placeholder="(83)99999-9999" v-model="telefone">
                    <span v-if="erro.telefone" class="erro text-danger text-nowrap">{{ erro.telefone }}</span>
                </div>
                <div class="col-md-6">
                    <label>Senha de Acesso</label>
                    <input type="password" class="form-control"  v-model="senha" placeholder="******" >
                    <span v-if="erro.senha" class="erro text-danger text-nowrap">{{ erro.senha }}</span>
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: "CadastroColab",
  data() {
    return {
      nome: "",
      cpf: "",
      dataNascimento: "",
      sexo: "",
      telefone:"",
      endereco:{
        rua: "",
        bairro:"",
        numero:"",
        cidade:"",
        estado:"",
        
      },
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
        telefone:"",
        endereco:{
        rua: "",
        bairro:"",
        numero:"",
        cidade:"",
        estado:""
      },
      },
      cep: '',
      cepData: null,
    };
  },
  methods: {
    async salvarColab() {
      const formdata = new FormData();
      formdata.append("nome", this.nome);
      formdata.append("cpf", this.cpf);
      formdata.append("dataNascimento", this.dataNascimento);
      formdata.append("sexo", this.sexo);
      formdata.append("telefone", this.telefone);
      formdata.append("endereco.rua", this.endereco.rua);
      formdata.append("endereco.bairro", this.endereco.bairro);
      formdata.append("endereco.numero", this.endereco.numero);
      formdata.append("endereco.cidade", this.endereco.cidade);
      formdata.append("endereco.estado", this.endereco.estado);
      formdata.append("endereco.cep", this.cepData.cep);
      formdata.append("email", this.email);
      formdata.append("senha", this.senha);
      formdata.append("tipoUsuario", this.tipoUsuario = "PADRAO");

      axios
        .post("http://localhost:8080/api/usuario", formdata,{
          headers: {
        'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          this.$toasted.success("Colaborador cadastrado com sucesso!",);
          this.msg = "Colaborador Cadastrado com Sucesso!";
          this.limparFormulario()
        })
        .catch((error) => {
         this.$toasted.error("Erro ao cadastrar colaborador");
         const mensagensErro = error.response.data;
         console.log(error.response.data)
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
            if (erro.campo == "sexo"){
                console.log(erro.mensagem)
               this.erro.sexo = erro.mensagem
            }
            if (erro.campo == "email"){
                console.log(erro.mensagem)
               this.erro.email = erro.mensagem
            }
            if (erro.campo == "telefone"){
                console.log(erro.mensagem)
               this.erro.telefone = erro.mensagem
            }
              
            if (erro.campo == "senha"){
                console.log(erro.mensagem)
               this.erro.senha = erro.mensagem
            }
            if (erro.campo == "endereco.rua"){
                console.log(erro.mensagem)
               this.erro.endereco.rua = erro.mensagem
            }
            if (erro.campo == "endereco.bairro"){
                console.log(erro.mensagem)
               this.erro.endereco.bairro = erro.mensagem
            }
            if (erro.campo == "endereco.cidade"){
                console.log(erro.mensagem)
               this.erro.endereco.cidade = erro.mensagem
            }
            if (erro.campo == "endereco.estado"){
                console.log(erro.mensagem)
               this.erro.endereco.estado = erro.mensagem
            }
            if (erro.campo == "endereco.numero"){
                console.log(erro.mensagem)
               this.erro.endereco.numero = erro.mensagem
            }
            if (erro.campo == "endereco.cep"){
                console.log(erro.mensagem)
               this.erro.endereco.cep = erro.mensagem
            }
            
            });
            
        });
        
    },
    async searchCep() {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);
        this.cepData = response.data;
        this.endereco.rua = this.cepData.logradouro
        this.endereco.bairro = this.cepData.bairro
        this.endereco.cidade = this.cepData.localidade
        this.endereco.estado = this.cepData.uf
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    },
    limparFormulario() {
      // Resetar os valores para os estados iniciais
      this.nome = "";
      this.cpf = "";
      this.dataNascimento = "";
      this.sexo = "";
      this.email = "";
      this.senha = "";
      this.telefone = "";
      this.cep = "";
      this.endereco.rua = "";
      this.endereco.bairro = "";
      this.endereco.cidade = "";
      this.endereco.estado = "";
      this.endereco.numero = "";
      

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