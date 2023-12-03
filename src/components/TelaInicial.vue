<template>
<body>
    <div class="container-fluid">
    <div id="geral" class="row">
        <nav id="sidebar" class="col-md-2 col-sm-12">
            <img id="img_nav" src="../assets/logo_biolab.png">
            <div id="botoes_laterais">
                <div class="item_lateral">
                    <button class="btn btn-outline-success btn-lg" @click="exibirlist()">Atendimento</button>
                    <div class="lista_opc" v-show="listI">
                        <button class="btn btn-outline-secondary border-0" @click="exibirAtendimento()">Novo Atendimento</button>
                        <button class="btn btn-outline-secondary border-0" @click="exibirNovoPaciente()">Novo Paciente</button>
                        <button class="btn btn-outline-secondary border-0" @click="exibirInserirLaudo()">Inserir Laudo</button>
                    </div>
                </div>
                </div>
                <div class="item_lateral">
                    <button class="btn btn-outline-success btn-lg" @click="exibirlist2()">Configuração</button>
                    <div class="lista_opc" v-show="listII">
                        <button class="btn btn-outline-secondary border-0" @click="exibirCadColab()">Cadastro Colaborador</button>
                        <button class="btn btn-outline-secondary border-0" @click="exibirCadProce()">Cadastro Procedimento</button>
                    </div>
                </div>

        </nav>
        <div class="col-md-10 col-sm-12"> 
            <div class="telas_forms" v-show="dashboard"> 
                <Dashboard/>
            </div>
            <div class="telas_forms" v-show="atendimento"> 
                <Atendimento/>
            </div>
            <div class="telas_forms" v-show="novo_paciente">
                <NovoPaciente/>
            </div>
            <div class="telas_forms" v-show="inserir_laudo"> 
                <InserirLaudo/>
            </div>
            <div class="telas_forms" v-show="cad_colab"> 
                <CadastroColab/>
            </div>
            <div class="telas_forms" v-show="cad_proc">
                <CadastroProce/>
            </div>
            </div>
        </div>
        <div class="col-sm-12">
            <button @click="sair()" id="sair" class="btn btn-danger">Sair</button>
        </div> 

        </div>

</body>
</template>

<script>
import Atendimento from '../forms/Atendimento.vue'
import NovoPaciente from '../forms/NovoPaciente.vue';
import InserirLaudo from '../forms/InserirLaudo.vue'
import CadastroColab from '../forms/CadastroColab.vue';
import CadastroProce from '../forms/CadastroProce.vue';
import Dashboard from './Dashboard.vue';

export default{
    name:"TelaInicial",
    components:{
        Atendimento,
        NovoPaciente,
        InserirLaudo,
        CadastroColab,
        CadastroProce,
        Dashboard
    },
    data(){
        return{
            listI : false,
            listII: false,
            atendimento: false,
            novo_paciente: false,
            pesquisar_pac: false,
            inserir_laudo: false,
            exibir_relatorio: false,
            cad_colab: false,
            cad_proc: false,
            dashboard: true,

        }
    },
    methods:{
        exibirlist(){
            this.listI = !this.listI;
            this.listII = false;
        },
        exibirlist2(){
            this.listII = !this.listII;
            this.listI = false;
        },
        exibirAtendimento(){
           this.atendimento = !this.atendimento;
           this.novo_paciente = false;
           this.pesquisar_pac = false;
           this.inserir_laudo = false;
           this.cad_colab = false;
           this.cad_proc = false;
           this.dashboard = !this.dashboard

        },
        exibirNovoPaciente(){
            this.novo_paciente = !this.novo_paciente;
            this.atendimento = false;
            this.pesquisar_pac = false;
            this.inserir_laudo = false;
            this.exibir_relatorio = false;
            this.cad_colab = false;
            this.cad_proc = false;
            this.dashboard = !this.dashboard
        },
        exibirInserirLaudo(){
            this.inserir_laudo = !this.inserir_laudo;
            this.atendimento = false;
            this.novo_paciente = false;
            this.pesquisar_pac = false;
            this.exibir_relatorio = false;
            this.cad_colab = false
            this.cad_proc = false;
        },
        exibirCadColab(){
            this.cad_colab = !this.cad_colab
            this.cad_proc = false;
            this.atendimento = false;
            this.novo_paciente = false;
            this.inserir_laudo = false;
            this.dashboard = !this.dashboard
        },
        exibirCadProce(){
            this.cad_proc = !this.cad_proc;
            this.cad_colab = false;
            this.atendimento = false;
            this.novo_paciente = false;
            this.inserir_laudo = false;
            this.dashboard = !this.dashboard
          
        },
        sair(){
            this.$router.push('/')
        }


    }
}
</script>

<style scoped>

.item_lateral .btn btn-outline-success{
    width: 100%;

}
.btn btn-outline-secondary{
    border: none;
}

#sidebar{
    background-color:#B4C2B4;
    bottom: 0;
    top:0;
    left:0;
    overflow-y:auto;
}
#botoes_laterais{
    display: block;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.item_lateral{
    background-color: #fff;
    display: grid;
    width: 100%;
    orientation: colunm;
    border-radius: 10px;
    align-items: center;
}

#sidebar #img_nav{
    width: 100%;
}

.container-fluid{
    background-color:#B4C2B4;
    overflow-y:auto;
    position: fixed;
    right:0;
    bottom: 0;
    top: 0;
}

.lista_opc{
    background-color: #fff;
    border-radius: 10px;
    display: grid;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top:2px;
    padding-bottom:5px;
}
.telas_forms{
    background-color: #B4C2B4;

}
.col-md-10{
    background-color: #B4C2B4;
    overflow-y:auto;
    margin-top:30px;
    left:0;
    right:0;
    bottom: 0;
    top: 0;
    align-items: center;
    border-right:#70B446;
}
#sair{
    bottom: 90%;
    left: 95%;
    position: fixed;
}


</style>
