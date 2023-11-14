<template>
    <div> 
    <h1>Novo Atendimento</h1>
    <div class="container"> 
        <form id="formulario_paciente" > 
            <div id="pesquisar" class="row"> 
                <div class="input-group col-md-10 col-sm-12" style="padding-bottom: 10px;">
                    <input  id="cpf" type="text"  maxlength="11" minlength="11" v-model="cpf" class="cpf-mask pesquisar form-control" title="Pesquisar" suf placeholder="Pesquise paciente por CPF" >
                    <span class="input-group-btn">
                        <button @click="buscarPaciente()" class="pesquisar btn btn-default"><img  src="../assets/pesquisa.png" style="width:25px"></button>
                    </span>
                </div>
            </div>
            <div id="resultado" v-for="patient in paciente" :key="patient.id" class="row"> 
                <div class="col-md-3 col-sm-12"> 
                    <h5>Nome Completo</h5>
                    <p>{{ patient.fullName }}</p>
                </div>
                <div class="col-md-3 col-sm-12"> 
                    <h5>Data de Nascimento</h5>
                    <p>{{ patient.birthDate }}</p>
                </div>
                       
                <div class="col-md-3 col-sm-12"> 
                    <h5>Cpf</h5>
                    <p>{{ paciente.cpf }}</p>
                </div> 
                <div class="col-md-3 col-sm-12"> 
                    <h5>Telefone</h5>
                    <p>{{ paciente.telephone }}</p>
                </div>
            </div>
            <div  class="row">
                <div id="medico_solict" class="col-md-8 col-sm-12"> 
                    
                </div> 
                
                <div class=" input-group col-md-8 col-sm-12"> 
                    <input type="text" class="form-control" v-model="crm" placeholder="CRM do médico solicitante">
                    <span class="input-group-btn">
                        <button id="slect_medico" @click="buscarMedicoCrm()" class="btn"><img  src="../assets/pesquisa.png" title="Pesquisar" style="width:25px"></button>
                        <button id="open_modal" type="button" class="btn " @click="ExibirModal()"><img  src="../assets/adicionar.png" title="Adicionar Médico no Sistema" style="width:25px">
                    </button>
                    </span>
                </div>    
            </div>
            <!--MODAL DE CADASTRO DO NOVO MÉDICO-->
            <div id="fade" v-show="exibir_modal">
                <div id="modal"> 
                    <div id="cabecalho">
                            <h3>Novo Médico</h3>
                            <button id="close_modal" class="btn btn-danger" @click="FecharModal()">X</button>
                    </div>
                <div class="modal_body"> 
                    <div class="row">
                        <div class="col-md-10"> 
                            <input type="text" class="form-control" v-model="nomeCompleto" placeholder="Nome Completo do Médico">
                        </div>
                        <div class="col-md-2"> 
                            <input type="text" class="form-control" v-model="ufCrm" placeholder="UF">
                        </div> 
                    </div>
                    <div id="n_conselho" class="row"> 
                        <div class="col-md-10"> 
                            <input type="number" class="form-control" v-model="crmsol" placeholder="Numero do Conselho">
                        </div>
                        <div id="sair_modal" class="col-md-2"> 
                            <button @click="NovoMedicoAss()" id="bt_salvar_cx" class="btn btn-success">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <!--MODAL DE CHECK-->
            <div id="fade" v-show="modal_check">
                <div id="modal_i">
                    <h4>{{ texto }}</h4>
                    <p>{{ description }}</p>
                    <button @click="exibir_modal_check()" class="btn btn-success" style="margin-top:5px;">OK</button>
                </div>
                
            </div>
            <div>
               
            </div>
            <div id="adicionar_procedimento" class="row"> 
                <div class=" input-group col-md-8 col-sm-12"> 
                    <input type="text" id="ps_medico" class="form-control col-sd-6" v-model="inputProcedimento" @input="filtro" placeholder="Pesquisar Procedimento">
                <span class="input-group-btn">
                    <button class="btn"><img  src="../assets/pesquisa.png" style="width:25px"></button>
                    <button @click="AdicionarListPC()" class="btn"><img  src="../assets/adicionar.png" style="width:25px"></button>
                </span>
                </div>
            </div>
             <!--Lista Flutuante-->
                <div style="margin-top: 10px;"> 
                    <ul class="list-group" v-if="ListSugestoes.length">
                    <li class="list-group-item" v-for="sugestoes in ListSugestoes" :key="sugestoes.id" @click="selecionar(sugestoes)">
                        {{ sugestoes.nomeProcedimento }}
                    </li>
                    </ul>
                </div>
            <!--Os itens selecionados serão adicionados em uma lista e essa lista será exibida abaixo usando o v-for-->
            <div class="list" v-for="item in ListProcedimentoSave" :key="item"> 
                <div id="item_ii" class="row">
                    <div class="col-md-1 col-sm-12">
                    <div> 
                        <p>{{ item.codigo }}</p>
                    </div>
                    </div>
                    <div class="col-md-9 col-sm-12">
                        <div> 
                            <p>{{ item.nomeProcedimento }}</p>
                        </div>
                    </div>
                    <div> 
                        <div> 
                            <p>{{ item.amostraPadrao.nomeAmostra }}</p>
                        </div>
                    </div>
                    <div id="btn" class="col-md-2 col-sm-12">
                        <div> 
                        <button class="btn">Remover</button>
                        </div>
                    </div>
                </div>
            </div>     
             
            
            <div id="btn_save">
                <input id="salvar" type="submit" class="btn btn-success" value="Salvar dados">
            </div>
        </form>  
    </div>
</div>    
</template>

<script>
import request from '../router/Requests'
export default{
    name: 'Atendimento',
    data(){
        return{
            inputProcedimento: '',
            ListSugestoes: [],
            paciente: [],
            name_medico:'',
            cpf:'',
            crm:'',
            crmsol:'',
            ufCrm: '',
            nomeCompleto:'',
            resultado : true,
            ListProcedimento: [],
            exibir_modal: false,
            medicosol: [],
            texto: '',
            modal_check: false,
            description: '',
            ListProcedimentoSave: []
           
        
        }
    },
    
    
  
    
    methods:{

        filtro(){
            this.ListSugestoes = this.ListProcedimento.filter( procedimento => 
            procedimento.nomeProcedimento.toLocaleLowerCase().includes(this.inputProcedimento.toLocaleLowerCase())
            );
            //desenvolver
        },
        selecionar(sugestoes){
            this.inputProcedimento = sugestoes.nomeProcedimento 
            this.ListSugestoes = []
        },
        exibir_modal_check(){
            this.modal_check = !this.modal_check
        },
        removerItem(){

        },
        ExibirModal(){
            this.exibir_modal = !this.exibir_modal;
        },
        FecharModal(){
            this.exibir_modal = !this.exibir_modal;
        },

         async buscarPaciente(){
            // Exemplo de como lidar com assincronismo usando async/await

                try {
                    const response = await request.get(`/patient/findByCPF/${this.cpf}`)
                    console.log(response.data);
                    this.paciente = response.data
                    if(response.data == ''){
                        this.exibir_modal_check()
                        this.texto = 'Paciente não encontrado!'
                    }
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                }


        },
        async buscarMedicoCrm(){
           
            try {
                    const response = await request.get(`/med/medicoSolicitante/crm/${this.crm}`);
                    console.log(response.data);
                    this.medicosol = response.data
                    this.name_medico = this.medicosol.nomeCompl
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                    this.exibir_modal_check()
                    this.texto = 'Opps! Médico não cadastrado =('
                    this.description = 'Para adicionar um novo médico cliquem em +'
                }
        },
        NovoMedicoAss(){
            //Construindo o Formdata que será enviado
            const formdata = new FormData()
            formdata.append('crm', this.crmsol)
            formdata.append('ufCrm',this.ufCrm)
            formdata.append('nomeCompl',this.nomeCompleto)
            formdata.append('active',true)
            //Enviando
            request
            .post(`/med/medicoSolicitante`,formdata)
            .then((dadoss)=>{
            //Armazendo os dados em uma lista
                this.medicosol = dadoss.data
                this.FecharModal()
                this.exibir_modal_check()
                this.texto = 'Cadastro Concluido!'
            })
        },

        async buscarProced(){
            
            
            try {
                    const response = await request.get(`/procedimento`);
                    console.log(response.data)
                    this.ListProcedimento = response.data
                    for( var i = 0; response.length; i++){
                        //Captar todas as Strings para adicionar na lista
                    }
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                }
        },

        AdicionarListPC(){
            console.log("entrou")
            console.log(this.inputProcedimento)
            this.ListProcedimentoSave = this.ListProcedimento
            console.log(this.ListProcedimento[0].nomeProcedimento)
            console.log(this.ListProcedimentoSave.length)
            console.log(this.ListProcedimento.length)
        }
        
    },
    mounted(){
        this.buscarProced();
    }
    
}

//const openModalButton = document.querySelector("#open_modal");
//const closeModalButton = document.querySelector("#close_modal")
//const fade = document.querySelector("#fade")
//const modal = document.querySelector("#modal")

//[openModalButton,closeModalButton,fade].forEach(element => {
   // element.addEventListener("click",()=> console.log("Teste"))
//});

</script>

<style scoped>

#btn_save{
    display: flex;
    align-items: center;
    justify-content: center;
}

.col-md-3 col-sm-12{
    display: flex;
    align-items: center;
    justify-content: center;
}


#medico_solict{
    margin: 0 auto;
}
#bt_salvar_cx{
    margin: 0 auto;
}

#item_ii{
    background-color: #d11c1c;
    width: 95%;
    padding: 10px 0px;
    border-radius: 10px;
    margin: 0 auto;
    align-items: center;
}

#cabecalho{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom:10px ;
    margin: 0 auto;
}

#item{
    background-color: white;
    margin-left: 30px;
    margin-right: 30px;
}
.list{
    margin: 20px 0px;
    background-color: white;
    padding: 10px;
}

#list_proc{
    background-color: #B4C2B4;
    border-radius: 10px;
}
#fade{
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    height: 100%;
    background-color: rgba(0,0, 0, 0.6);
    z-index: 5;
}

#modal{
    position: fixed;
    background-color: #B4C2B4;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:600px;
    max-width: 90%;
    padding: 1.2rem;
    border-radius: 0.5rem;
    
}

#modal_i{
    position: fixed;
    background-color: #B4C2B4;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:400px;
    max-width: 90%;
    padding: 1.2rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.col-md-1{
    align-items:flex-start;
}
#bt_salvar_cx{
    right:0;
}

#n_conselho{
    margin-top: 7px;
}
#form{
    background-color: #B4C2B4;
    overflow-y:auto;
    margin: 0 auto;

}
#pesquisar{
    background-image: none;
}
#formulario_paciente{
    background-color: #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    height: 80%;
    margin: 0 auto;
}

#resultado{
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    
}
#adicionar_procedimento{
    margin-top:10px ;
}
.list_proc{
    margin-top: 10px ;
    background-color: rgb(182, 27, 27);
    border-radius: 10px;
}

</style>
