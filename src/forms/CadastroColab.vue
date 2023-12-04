<template>
  <div>
    <div id="formulario_paciente" class=" container">
      <form class="formulario" @submit.prevent="salvarColab()" ref="form">
        <h2>Cadastro Colaborador</h2>
        <div style=" display: flex; justify-content: center;">
        </div>
        <div class="row">
          <div class="col-md-2 col-12">
            <label>Cpf</label>
            <input type="text" class="form-control " v-model="$v.cpf.$model" placeholder="999.999.999.99"
              v-mask="['###.###.###-##', '###.###.###-##']" :class="{ error: $v.cpf.$error }">
            <span v-if="erro.cpf" class="erro text-danger text-break">{{ erro.cpf }}</span>
          </div>
          <div class="col-md-10 col-12">
            <label>Nome Completo</label>
            <input type="text" class="form-control" v-model="$v.nome.$model" placeholder="Nome Completo"
              :class="{ error: $v.nome.$error }">
            <span v-if="erro.nome" class="erro text-danger text-break">{{ erro.nome }}</span>
          </div>
          <div class="col-md-10 col-12">
            <label>Email</label>
            <input type="text" class="form-control" v-model="$v.email.$model" placeholder="meuemail@gmail.com"
              :class="{ error: $v.email.$error }">
            <span v-if="erro.email" class="erro text-danger text-break">{{ erro.email }}</span>
          </div>
          <div class="col-md-2">
            <label>Data de nascimento</label>
            <input type="date" class="form-control" v-model="$v.dataNascimento.$model"
              :class="{ error: $v.dataNascimento.$error }">
            <span v-if="erro.dataNascimento" class="erro text-danger text-break">{{ erro.dataNascimento }}</span>
          </div>
          <div class="col-md-6">
            <label>Sexo</label>
            <select class="form-select" v-model="$v.sexo.$model" :class="{ error: $v.sexo.$error }">
              <option :value="''" selected></option>
              <option :value="'M'">Masculino</option>
              <option :value="'F'">Feminino</option>
            </select>
            <span v-if="erro.sexo" class="erro text-danger text-nowrap">{{ erro.sexo }}</span>
          </div>
          <div class="col-md-6">
            <label>Telefone</label>
            <input type="text" class="form-control" placeholder="(83)99999-9999" v-model="$v.telefone.$model"
              v-mask="['(##) ####-####', '(##) #####-####']" :class="{ error: $v.telefone.$error }">
            <span v-if="erro.telefone" class="erro text-danger text-nowrap">{{ erro.telefone }} </span>
          </div>
          <div class="col-md-12">
            <label>Senha de Acesso</label>
            <input type="password" class="form-control" v-model="$v.senha.$model" placeholder="******"
              :class="{ error: $v.senha.$error }">
            <span v-if="erro.senha" class="erro text-danger text-nowrap">{{ erro.senha }}</span>
          </div>
          <h3 class="mt-2">Endereço</h3>
          <div class="col-md-2">
            <span></span>
            <label for="cep">Cep</label>
            <input type="text" id="cep" v-model="$v.cep.$model" @input="searchCep" class="form-control"
              placeholder="0000-000" v-mask="['#####-###', '#####-###']" :class="{ error: $v.cep.$error }">
            <span v-if="erro.endereco.cep" class="erro text-danger text-break">{{ erro.endereco.cep }}</span>
          </div>

          <div class="col-md-10">
            <span></span>
            <label>Rua</label>
            <input type="text" class="form-control" v-model="$v.endereco.rua.$model" 
              :class="{ error: $v.endereco.rua.$error }">
            <span v-if="erro.endereco.rua" class="erro text-danger text-nowrap">{{ erro.endereco.rua }}</span>
          </div>
          <div class="col-md-5">
            <span></span>
            <label>Bairro</label>
            <input type="text" class="form-control" v-model="$v.endereco.bairro.$model"
              :class="{ error: $v.endereco.bairro.$error }">
            <span v-if="erro.endereco.bairro" class="erro text-danger text-break">{{ erro.endereco.bairro }}</span>
          </div>

          <div class="col-md-5">
            <span></span>
            <label>Cidade</label>
            <input type="text" class="form-control" placeholder="" v-model="$v.endereco.cidade.$model"
              :class="{ error: $v.endereco.cidade.$error }">
            <span v-if="erro.endereco.cidade" class="erro text-danger text-nowrap">{{ erro.endereco.cidade }}</span>
          </div>
          <div class="col-md-1">
            <span></span>
            <label>Estado</label>
            <input type="text" class="form-control" placeholder="" v-model="$v.endereco.estado.$model"
              :class="{ error: $v.endereco.estado.$error }">
            <span v-if="erro.endereco.estado" class="erro text-danger text-nowrap">{{ erro.endereco.estado }}</span>
          </div>

          <div class="col-md-1">
            <span></span>
            <label>Numero</label>
            <input type="text" class="form-control" v-model="$v.endereco.numero.$model"
              :class="{ error: $v.endereco.numero.$error }">
            <span v-if="erro.endereco.numero" class="erro text-danger text-nowrap">{{ erro.endereco.numero }}</span>
          </div>
          <div id="salvar" class="mt-3 d-flex justify-content-end">
            <input type="submit" class="btn btn-success large">
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
      telefone: "",
      endereco: {
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        estado: "",

      },
      email: "",
      senha: "",
      tipoUsuario: "PADRAO",
      erro: {
        nome: "",
        cpf: "",
        dataNascimento: "",
        sexo: "",
        email: "",
        senha: "",
        telefone: "",
        endereco: {
          rua: "",
          bairro: "",
          numero: "",
          cidade: "",
          estado: ""
        },
      },
      cep: '',
      cepData: null,
    };
  },
  validations: {
    nome: { required },
    cpf: { required },
    dataNascimento: { required },
    sexo: { required },
    telefone: { required },
    endereco: {
      rua: { required },
      bairro: { required },
      numero: { required },
      cidade: { required },
      estado: { required },

    },
    email: { required },
    senha: { required },
    cep: { required },
  },
  methods: {
    async salvarColab() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

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
        .post("http://localhost:8080/api/usuario", formdata, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          this.$toasted.success("Colaborador cadastrado com sucesso!",);
          this.$refs.form.reset();
          this.limparError();
        })
        .catch((error) => {
          this.$toasted.error("Erro ao cadastrar colaborador");
          const mensagensErro = error.response.data;
          console.log(error.response.data)
          mensagensErro.forEach((erro) => {
            if (erro.campo == "cpf") {
              console.log(erro.mensagem)
              this.erro.cpf = erro.mensagem
            }
            if (erro.campo == "nome") {
              console.log(erro.mensagem)
              this.erro.nome = erro.mensagem
            }
            if (erro.campo == "dataNascimento") {
              console.log(erro.mensagem)
              this.erro.dataNascimento = erro.mensagem
            }
            if (erro.campo == "sexo") {
              console.log(erro.mensagem)
              this.erro.sexo = erro.mensagem
            }
            if (erro.campo == "email") {
              console.log(erro.mensagem)
              this.erro.email = erro.mensagem
            }
            if (erro.campo == "telefone") {
              console.log(erro.mensagem)
              this.erro.telefone = erro.mensagem
            }

            if (erro.campo == "senha") {
              console.log(erro.mensagem)
              this.erro.senha = erro.mensagem
            }
            if (erro.campo == "endereco.rua") {
              console.log(erro.mensagem)
              this.erro.endereco.rua = erro.mensagem
            }
            if (erro.campo == "endereco.bairro") {
              console.log(erro.mensagem)
              this.erro.endereco.bairro = erro.mensagem
            }
            if (erro.campo == "endereco.cidade") {
              console.log(erro.mensagem)
              this.erro.endereco.cidade = erro.mensagem
            }
            if (erro.campo == "endereco.estado") {
              console.log(erro.mensagem)
              this.erro.endereco.estado = erro.mensagem
            }
            if (erro.campo == "endereco.numero") {
              console.log(erro.mensagem)
              this.erro.endereco.numero = erro.mensagem
            }
            if (erro.campo == "endereco.cep") {
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
    limparError() {
      // Resetar os valores para os estados iniciais
      this.erro.nome = "";
      this.erro.cpf = "";
      this.erro.dataNascimento = "";
      this.erro.sexo = "";
      this.erro.email = "";
      this.erro.senha = "";
      this.erro.telefone = "";
      this.erro.endereco.cep = "";
      this.erro.endereco.rua = "";
      this.erro.endereco.bairro = "";
      this.erro.endereco.cidade = "";
      this.erro.endereco.estado = "";
      this.erro.endereco.numero = "";
    },


  },
};
</script>

<style scoped>
label {
  margin-top: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.error {
  border: 1px solid red;
}

.errorSelect {
  color: red;
}

#formulario_paciente {
  margin-top: 20px;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
  height: 65%;
  width: 100%;
}</style>
