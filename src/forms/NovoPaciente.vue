<template>
  <div id="formulario_paciente" class="d-flex">
    <form class="formulario" @submit="salvarPaciente()" ref="form">
      <h2>Novo Paciente</h2>
      <div class="row">
        <div class="col-md-2 col-12">
          <label>CPF</label>
          <input type="text" class="form-control" placeholder="999.999.999.99"
            v-mask="['###.###.###-##', '###.###.###-##']" v-model="$v.cpf.$model" :class="{ error: $v.cpf.$error }">
        </div>
        <div class="col-md-10 col-12">
          <label>Nome Completo</label>
          <input type="text" class="form-control" placeholder="Nome Completo" v-model="$v.fullName.$model"
            :class="{ error: $v.fullName.$error }">
        </div>
        <div class="col-md-9 col-12">
          <label>Email</label>
          <input type="text" class="form-control" placeholder="emial@gmail.com" v-model="$v.email.$model"
            :class="{ error: $v.email.$error }">
        </div>
        <div class="col-md-3">
          <label>Data de nascimento</label>
          <input type="date" class="form-control" v-model="$v.birthDate.$model" :class="{ error: $v.birthDate.$error }">
        </div>
        <div class="col-md-3">
          <label>Sexo</label>
          <select class="form-select" v-model="$v.sex.$model" :class="{ error: $v.sex.$erro }">
            <!-- <option selected>Selecione o sexo</option> -->
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div class="col-md-9">
          <label>Telefone</label>
          <input type="text" class="form-control" placeholder="(83) 99999-9999"
            v-mask="['(##) ####-####', '(##) #####-####']" v-model="$v.telephone.$model"
            :class="{ error: $v.telephone.$error }">
        </div>
        <h3>Endereço:</h3>
        <div class="col-md-2 col-12">
          <label>Cep</label>
          <input type="text" class="form-control" placeholder="00000-000" @input="searchCep"
            v-mask="['#####-###', '#####-###']" v-model="$v.endereco.cep.$model" :class="{ error: $v.endereco.cep.$error }">
        </div>
        <div class="col-md-10 col-12">
          <label>Rua</label>
          <input type="text" class="form-control" placeholder="Rua Clinica Biolab" v-model="$v.endereco.rua.$model"
            :class="{ error: $v.endereco.rua.$error }">
        </div>
        <div class="col-md-4 col-12">
          <label>Bairro</label>
          <input type="text" class="form-control" v-model="$v.endereco.bairro.$model"
            :class="{ error: $v.endereco.bairro.$error }">
        </div>
        <div class="col-md-4 col-12">
          <label>Cidade</label>
          <input type="text" class="form-control" v-model="$v.endereco.cidade.$model"
            :class="{ error: $v.endereco.cidade.$error }">
        </div>
        <div class="col-md-3 col-12">
          <label>Estado</label>
          <input type="text" class="form-control" v-model="$v.endereco.estado.$model"
            :class="{ error: $v.endereco.estado.$error }">
        </div>
        <div class="col-md-1 col-12">
          <label>Numero</label>
          <input type="text" class="form-control" v-model="$v.endereco.numero.$model"
            :class="{ error: $v.endereco.numero.$error }">
        </div>


        <div id="salvar" class="salvar d-flex justify-content-end">
          <input type="submit" class="btn btn-success large">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import { required } from 'vuelidate/lib/validators'
import request from '../router/Requests'

export default {
  data() {
    return {
      fullName: "",
      cpf: "",
      email: "",
      birthDate: "",
      sex: "",
      telephone: "",
      endereco: {
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: ""
      }
    }
  },
  validations: {
    fullName: { required },
    cpf: { required },
    email: { required },
    birthDate: { required },
    sex: { required },
    telephone: { required },
    endereco: {
      rua: { required },
      bairro: { required },
      numero: { required },
      cidade: { required },
      estado: { required },
      cep: { required }
    },
  },
  directives: { mask },
  name: 'NovoPaciente',
  methods: {
    async salvarPaciente() {
      if (this.$v.sex.$invalid) {
        this.$toasted.error("Selecione o sexo");
      }
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }


      const form = new FormData();
      form.append("cpf", this.cpf);
      form.append("fullName", this.fullName);
      form.append("email", this.email);
      form.append("birthDate", this.birthDate);
      form.append("sex", this.sex);
      form.append("telephone", this.telephone);
      form.append("endereco.cep", this.endereco.cep);
      form.append("endereco.rua", this.endereco.rua);
      form.append("endereco.bairro", this.endereco.bairro);
      form.append("endereco.numero", this.endereco.numero);
      form.append("endereco.cidade", this.endereco.cidade);
      form.append("endereco.estado", this.endereco.estado);

      await request.post("/patient", form).then(({ data }) => {
        this.$toasted.success("Paciente Cadastrado com sucesso!",);
        this.$refs.form.reset();
      }).catch(({ data }) => {
        this.$toasted.error("Erro ao cadastrar");
      });

    },
    async searchCep() {
      try {
        const response = await request.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`);
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

}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

h3 {
  margin-top: 20px;
}

label {
  margin-top: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.salvar {
  margin-top: 30px;
}

.error {
  border: 1px solid red;
}

#formulario_paciente {
  margin-top: 100px;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
  height: 65%;
  width: 98%;
}</style>
