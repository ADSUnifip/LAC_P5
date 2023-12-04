<template>
  <div class="principal d-flex justify-content-center">
    <div id="formulario_procedimento">
      <h2>Cadastro de Procedimento</h2>
      <form class="formulario" @submit="salvarProced()" ref="form">
        <div class="row">
          <div class="col-md-4 col-12 col-sm-12">
            <label class="titulo">Mnemônico *</label>
            <input v-model="$v.mnemonico.$model" type="text" class="form-control" placeholder="Ex: A.B.C"
              :class="{ error: $v.mnemonico.$error }" />
          </div>
          <div class="col-md-8 col-12">
            <label class="titulo">Nome Procedimento *</label>
            <input v-model="$v.nomeProcedimento.$model" type="text" class="form-control"
              placeholder="Nome Completo (sem abreviações)" :class="{ error: $v.nomeProcedimento.$error }" />
          </div>

          <div class="col-md-12 col-sm-12">
            <label class="titulo">Tipo de Amostra *</label>
            <select v-model="$v.amostraPadrao.$model" class="form-select" :class="{ error: $v.amostraPadrao.$error }">
              <option selected>-- Selecione --</option>
              <option value="Sangue">Sangue</option>
              <option value="Urina">Urina</option>
              <option value="Fezes">Fezes</option>
              <option value="Saliva">Saliva</option>
              <option value="Outros">Outro ...</option>
            </select>
          </div>

          <div class="col-md-12 col-sm-12">
            <label class="titulo">Metodologia</label>
            <textarea v-model="$v.metodologia.$model" class="form-control" rows="4"
              placeholder="Descreva a Metodologia ou use como campo de Observação"
              :class="{ error: $v.metodologia.$error }"></textarea>
          </div>

          <div class="btn d-flex justify-content-end" id="salvar">
            <input type="submit" class="btn btn-success large" />
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
  name: "CadastroProce",
  data() {
    return {
      mnemonico: "",
      nomeProcedimento: "",
      amostraPadrao: "",
      metodologia: "",
    };
  },
  validations: {
    mnemonico: { required },
    nomeProcedimento: { required },
    amostraPadrao: { required },
    metodologia: { required },
  },
  methods: {
    created() {
      axios.interceptors.request.use(
        (config) => {
          const token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlvQGdtYWlsLmNvbSIsImlzcyI6IlByb2pldG8gUDUiLCJleHAiOjE2OTk5OTgxMjB9.liZ7I2UtOyldobKZsfNZ9g0rJxBQkAGxyqCL5s1sEUE";
          if (token) {
            config.headers.Authorization = token;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    salvarProced() {

      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const procedimentoData = new FormData();
      procedimentoData.append("menemonico", this.mnemonico);
      procedimentoData.append("nomeProcedimento", this.nomeProcedimento);
      procedimentoData.append("amostraPadrao", this.amostraPadrao);
      procedimentoData.append("metodologia", this.metodologia);

      axios
        .post("http://localhost:8080/api/procedimento", procedimentoData)
        .then((response) => {
          this.$toasted.success("Procedimento Cadastrado com sucesso!");
          this.$refs.form.reset();
          this.$toasted.success("Dados salvos com Sucesso!")
        })
        .catch((error) => {
          this.$toasted.error("Falha ao salvar dados");
        });
    },
  },
};
</script>

<style scoped>
#formulario_procedimento {
  margin-top: 20px;
  background-color: white;
  border-radius: 18px;
  padding: 10px;
  height: 65%;
  width: 98%;
}

label {
  margin-top: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.error {
  border: 1px solid red;
}

#salvar {
  padding-top: 25px;
}</style>
