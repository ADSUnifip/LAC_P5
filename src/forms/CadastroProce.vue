<template>
  <div class="principal">
    <h1>Cadastro de Procedimento</h1>
    <div id="formulario_procedimento">
      <h3>Dados do Procedimento</h3>
      <form class="formulario" @submit="salvarProced()" ref="form">
        <div class="row">
          <div class="col-md-4 col-12 col-sm-12">
            <label class="titulo">Mnemônico *</label>
            <input
              v-model="mnemonico"
              type="text"
              class="form-control"
              placeholder="Ex: A.B.C"
              required
            />
          </div>
          <div class="col-md-8 col-12">
            <label class="titulo">Nome Procedimento *</label>
            <input
              v-model="nomeProcedimento"
              type="text"
              class="form-control"
              placeholder="Nome Completo (sem abreviações)"
              required
            />
          </div>

          <div class="col-md-12 col-sm-12">
            <label class="titulo">Tipo de Amostra *</label>
            <select v-model="amostraPadrao" class="form-select" required>
              <option selected>-- Selecione --</option>
              <option value="Tipo_01">Sangue</option>
              <option value="Tipo_02">Urina</option>
              <option value="Tipo_03">Fezes</option>
              <option value="Tipo_04">Saliva</option>
              <option value="Tipo_05">Outro ...</option>
            </select>
          </div>

          <div class="col-md-12 col-sm-12">
            <label class="titulo">Metodologia</label>
            <textarea
              v-model="metodologia"
              class="form-control"
              rows="4"
              placeholder="Descreva a Metodologia ou use como campo de Observação"
            ></textarea>
          </div>

          <div class="btn" id="salvar">
            <input type="submit" class="btn btn-success large" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

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
      const procedimentoData = new FormData();
      procedimentoData.append("menemonico", this.mnemonico);
      procedimentoData.append("nomeProcedimento", this.nomeProcedimento);
      procedimentoData.append("amostraPadrao", this.amostraPadrao);
      procedimentoData.append("metodologia", this.metodologia);

      axios
        .post("http://localhost:8080/api/procedimento", procedimentoData)
        .then((response) => {
          console.log(response);
          this.$refs.form.reset();
          alert("Dados Salvos com Sucesso!");
          console.log("Dados enviados com sucesso:", response.data);
        })
        .catch((error) => {
          console.log("Erro ao enviar dados!", error);
        });
    },
  },
};
</script>
  
<style scoped>
#formulario_procedimento {
  background-color: #d9d9d9;
  border-radius: 5px;
  padding: 10px;
  height: 80%;
}

h3 {
  margin: 1rem;
}

.titulo {
  padding: 0.5rem;
}

#salvar {
  padding-top: 25px;
}
</style>