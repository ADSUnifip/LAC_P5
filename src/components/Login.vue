<template>
  <div id="home" class="container-fluid">
    <div id="div_form_login" class="box">
      <img id="image" src="../assets/logo_biolab.png" alt="logo" />
      <form id="login" @submit.prevent="fazerLogin">
        <label for="email" class="form-label">Email</label>
        <input
          name="senha"
          type="email"
          id="email"
          class="form-control"
          placeholder="name@example.com"
          v-model="email"
        />
        <label for="senha" class="form-label">Senha</label>
        <input
          name="senha"
          id="senha"
          type="password"
          class="form-control"
          v-model="senha"
        />
        <button type="submit" id="entrar" class="btn btn-success">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      senha: "",
    };
  },

  methods: {
    async fazerLogin() {
      const formdata = new FormData();
      formdata.append("email", this.email);
      formdata.append("senha", this.senha);

      axios
        .post("http://localhost:8080/api/login", formdata)
        .then(({ dados }) => {
          alert(dados);
          this.$router.push("/inicio");
          console.log(dados);
        })
        .catch(({ error }) => {
          alert("Verifique o seu email e senha");
        });

      try {
        const json = await dados.json();
        if (json && json.token) {
          localStorage.setItem("token", `Bearer ${json.tokenJWT}`);
        } else {
          console.error("Invalid response from server");

        }
      } catch (error) {
        console.error(error);
      }

      const resposta = await fetch("http://localhost:8081/api/login/", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          senha: this.senha,
        }),
      });
      console.log(await resposta.json());

      try {
        const json = await resposta.json();
        console.log(json);
        if (json && json.token) {
          localStorage.setItem("token", `Bearer ${json.tokenJWT}`);
          router.push("/inicio");
          window.location.reload();
        } else {
          console.error("Não houve retorno do servidor");
        }
      } catch (erro) {
        console.log("erro");
        console.log(erro);
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  width: 100%;
  background-color: #b4c2b4;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  position: fixed;
}

.box {
  padding: 10px;
  display: grid;
  width: 350px;
  height: 400px;
  background-color: #b4c2b4;
  border-radius: 10px;
  border: solid 1px blanchedalmond;
}
.box #login #entrar {
  align-items: center;
  margin-left: 22%;
  margin-top: 20px;
  width: 50%;
}

.box #login {
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.box #image {
  width: 330px;
  height: 150px;
}
</style>
