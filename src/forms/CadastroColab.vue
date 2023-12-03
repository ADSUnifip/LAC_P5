<template>
  <div id="formulario_paciente" class="d-flex justify-content-center">
    <form class="formulario" @submit.prevent="salvarColab()" ref="form">
      <h2>Cadastro Colaborador</h2>
      <div style=" display: flex; justify-content: center;">
      </div>
      <div class="row">
        <div class="col-md-2 col-12">
          <label>Cpf</label>
          <input type="text" class="form-control " v-model="cpf" placeholder="999.999.999.99"
            v-mask="['###.###.###-##', '###.###.###-##']">

        </div>
        <div class="col-md-10 col-12">
          <label>Nome Completo</label>
          <input type="text" class="form-control" v-model="nome" placeholder="Nome Completo">

        </div>
        <div class="col-md-10 col-12">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email" placeholder="meuemail@gmail.com">

        </div>
        <div class="col-md-2">
          <label>Data de nascimento</label>
          <input type="date" class="form-control" v-model="dataNascimento">

        </div>
        <div class="col-md-4">
          <label>Sexo</label>
          <select class="form-select" v-model="sexo">
            <option :value="''" selected></option>
            <option :value="'M'">Masculino</option>
            <option :value="'F'">Feminino</option>
          </select>

        </div>
        <div class="col-md-8">
          <label>Telefone</label>
          <input type="text" class="form-control" placeholder="(83)99999-9999" v-model="telefone">

        </div>
        <div class="col-md-6">
          <label>Senha de Acesso</label>
          <input type="password" class="form-control" v-model="senha" placeholder="******">

        </div>
        <h3 class="mt-3">Endereço</h3>
        <div class="col-md-2">
          <span></span>
          <label for="cep">Cep</label>
          <input type="text" id="cep" v-model="endereco.cep" @input="searchCep" class="form-control" placeholder="0000-000"
            v-mask="['#####-###', '#####-###']">

        </div>
        <div class="col-md-10">
          <span></span>
          <label>Rua</label>
          <input type="text" class="form-control" v-model="endereco.rua" readonly>

        </div>
        <div class="col-md-5">
          <label>Bairro</label>
          <input type="text" class="form-control" placeholder="" v-model="endereco.bairro">

        </div>
        <div class="col-md-5">
          <label>Cidade</label>
          <input type="text" class="form-control" placeholder="" v-model="endereco.cidade">

        </div>
        <div class="col-md-1">
          <span></span>
          <label>Estado</label>
          <input type="text" class="form-control" placeholder="" v-model="endereco.estado">

        </div>
        <div class="col-md-1">
          <label>Numero</label>
          <input type="text" class="form-control" v-model="endereco.numero">
        </div>
        <div id="salvar" class="d-flex justify-content-end mt-5">
          <input type="submit" class="btn btn-success large">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import request from '../router/Requests'

export default {
  name: "CadastroColab",
  data() {
    return {
      nome: "",
      cpf: "",
      dataNascimento: "",
      sexo: "",
      telefone: "",
      endereco: {
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        estado: ""
      },
      email: "",
      senha: "",
      tipoUsuario: "PADRAO",
      msg: "",
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
      formdata.append("endereco.cep", this.endereco.cep);
      formdata.append("endereco.rua", this.endereco.rua);
      formdata.append("endereco.bairro", this.endereco.bairro);
      formdata.append("endereco.numero", this.endereco.numero);
      formdata.append("endereco.cidade", this.endereco.cidade);
      formdata.append("endereco.estado", this.endereco.estado);
      formdata.append("email", this.email);
      formdata.append("senha", this.senha);
      formdata.append("tipoUsuario", this.tipoUsuario = "PADRAO");

      request
        .post("http://localhost:8080/api/usuario", formdata)
        .then(({ data }) => {
          this.$toasted.success("Colaborador Cadastrado com sucesso!",);
          this.$refs.form.reset();
        })
        .catch((error) => {
          this.$toasted.error("Erro ao cadastrar Colaborador",);

        });

    },
    async searchCep() {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`);
        this.cepData = response.data;
        this.endereco.rua = this.cepData.logradouro
        this.endereco.bairro = this.cepData.bairro
        this.endereco.cidade = this.cepData.localidade
        this.endereco.estado = this.cepData.uf
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    },
  }
};
</script>

<style scoped>
#salvar {
  align-items: baseline;
}

label {
  margin-top: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

#formulario_paciente {
  margin-top: 20px;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
  height: 65%;
  width: 100%;
}
</style>
