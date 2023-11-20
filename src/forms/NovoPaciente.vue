<template>
  <div id="formulario_paciente" class="d-flex">
    <form class="formulario" @submit="salvarPaciente()">
      <h2>Novo Paciente</h2>
      <div class="row">
        <div class="col-md-2 col-12">
          <label>Cpf</label>
          <input type="text" class="form-control" placeholder="999.999.999.99" required
            v-mask="['###.###.###-##', '###.###.###-##']" v-model="cpf">
        </div>
        <div class="col-md-10 col-12">
          <label>Nome Completo</label>
          <input type="text" class="form-control" placeholder="Nome Completo" required v-model="fullName">
        </div>
        <div class="col-md-9 col-12">
          <label>Email</label>
          <input type="text" class="form-control" placeholder="meuemial@gmail.com" v-model="email">
        </div>
        <div class="col-md-3">
          <label>Data de nascimento</label>
          <input type="date" class="form-control" required v-model="birthDate">
        </div>
        <div class="col-md-3">
          <label>Sexo</label>
          <select class="form-select" v-model="sex">
            <option selected>Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div class="col-md-9">
          <label>Telefone</label>
          <input type="text" class="form-control" placeholder="(83) 99999-9999" required
            v-mask="['(##) ####-####', '(##) #####-####']" v-model="telephone">
        </div>
        <!-- <div class="col-md-4">
                        <label>Cep</label>
                        <input type="text" class="form-control" placeholder="00000-000" required
                            v-mask="['#####-###', '#####-###']" v-model="cep">
                    </div>
                    <div class="col-md-12">
                        <label>Endereço</label>
                        <input type="text" class="form-control" placeholder="Rua Clinica Biolab" required
                            v-model="endereco">
                    </div> -->
        <div id="salvar" class="salvar d-flex justify-content-end">
          <input type="submit" class="btn btn-success large">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
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
      // cep: "",
      // endereco: ""
    }
  },
  directives: { mask },
  name: 'NovoPaciente',
  methods: {
    async salvarPaciente() {
      const form = new FormData();
      form.append("cpf", this.cpf);
      form.append("fullName", this.fullName);
      form.append("email", this.email);
      form.append("birthDate", new Date(this.birthDate));
      form.append("sex", this.sex);
      form.append("telephone", this.telephone);
      // form.append("cep", this.cep);
      // form.append("endereco", this.endereco);

      var response = await request.post("/patient", form).then(({ data }) => {
        form.delete();
      });


    }
  }

}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

label {
  margin-bottom: 3px;
  margin-top: 3px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.salvar {
  margin-top: 30px;
}

#formulario_paciente {
  margin-top: 100px;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
  height: 65%;
  width: 98%;
}
</style>
