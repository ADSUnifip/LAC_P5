<template>
    <div> 
    <h1>Novo Atendimento</h1>
    <div class="container"> 
        <form id="formulario_paciente"  ref="form"> 
            <div id="pesquisar" class="row"> 
                <label class="labell">Cpf do paciente</label>
                <div class=" input-group col-md-8 col-sm-12"> 
                    <input type="text" class="form-control" v-model="cpf" maxlength="14" minlength="11" placeholder="Insira o CPF do paciente" required>
                    <span class="input-group-addon">
                        <button @click="buscarPaciente()" class=" botoes btn" style="margin-right: 60px;"><img  src="../assets/pesquisa.png" title="Pesquisar" style="width:25px"></button>
                    </span>
                    <button  type="button" class="btn" @click= "pushAtendimento()"><img  src="../assets/adicionar.png" title="Adicionar Médico no Sistema" style="width:25px">
                    </button>
                </div>  
            </div>
            <div id="resultado" v-for="patient in paciente" :key="patient.id" class="col"> 
                <div class=" row itens"> 
                    <div class="icon col-md-3 col-sm-12"> 
                    <h5>Nome Completo</h5>
                    <p>{{ patient.fullName }}</p>
                </div>
                <div class="icon col-md-3 col-sm-12"> 
                    <h5>Data de Nascimento</h5>
                    <p>{{ patient.birthDate}}</p>
                </div>
                       
                <div class=" icon col-md-3 col-sm-12"> 
                    <h5>Cpf</h5>
                    <p>{{ patient.cpf }}</p>
                </div> 
                <div class=" icon col-md-3 col-sm-12"> 
                    <h5>Telefone</h5>
                    <p>{{ patient.telephone }}</p>
                </div>
                </div>
                
            </div>
            <div  class="row">
                <label class="labell">CRM do médico solicitante</label>
                <div class=" input-group col-md-8 col-sm-12"> 
                    <input type="text" class="form-control" v-model="crm" maxlength="8" minlength="8" placeholder="Ex: PB123456" required>
                    <span class="input-group-addon">
                        <button id="slect_medico" @click="buscarMedicoCrm()" class=" botoes btn" style="margin-right: 60px;"><img  src="../assets/pesquisa.png" title="Pesquisar" style="width:25px"></button>
                    </span>
                    <button id="open_modal" type="button" class="btn" @click="Modal()"><img  src="../assets/adicionar.png" title="Adicionar Médico no Sistema" style="width:25px">
                    </button>
                </div>    
            </div>
            <div id="resultado" v-for="medicos in medicosol" :key="medicos.id" class="col">
                <div class="row itens"> 
                <div class=" icon col-md-3 col-sm-12" > 
                    <h5>Nome Completo</h5>
                    <p>{{ medicos.nomeCompl }}</p>
                </div>
                <div class="icon col-md-3 col-sm-12"> 
                    <h5>CRM</h5>
                    <p>{{ medicos.crm }}</p>
                </div>
                       
                <div class="icon col-md-3 col-sm-12"> 
                    <h5>UF</h5>
                    <p>{{ medicos.ufCrm }}</p>
                </div> 
                <div class="icon col-md-3 col-sm-12"> 
                    <button @click="cancelar()" class="btn btn-danger" style="transform: translateY(45%)">Remover</button>
                </div> 
                </div>
                
            </div>
            <!--MODAL DE CADASTRO DO NOVO MÉDICO-->
            <div id="fade" v-show="exibir_modal">
                <div id="modal"> 
                    <div id="cabecalho">
                            <h3>Novo Médico</h3>
                            <button id="close_modal" class="btn btn-danger" @click="Modal()">X</button>
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
                            <input type="text" class="form-control" v-model="crmsol" placeholder="Numero do Conselho" maxlength="8">
                        </div>
                        <div id="sair_modal" class="col-md-2"> 
                            <button @click="NovoMedicoAss()" id="bt_salvar_cx" class="btn btn-success">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          
            <div id="adicionar_procedimento" class="col"> 
                <label class="labell">Pesquisar Procedimento</label>
                <div class=" input-group col-md-8 col-sm-12"> 
                    <input type="text" id="ps_medico" class="form-control col-sd-6" v-model="inputProcedimento" @input="filtro" placeholder="Pesquisar Procedimento" required>
                <span class="input-group-addon">
                    <button class=" botoes btn" style="margin-right: 60px;"><img  src="../assets/pesquisa.png" style="width:25px"></button>
                    <button @click="AdicionarListPC()" class="btn"><img  src="../assets/adicionar.png" style="width:25px"></button>
                </span>
                </div>
            </div>
             <!--Lista Flutuante-->
                <div id="listaflutuante" style="margin-top: 10px;"> 
                    <ul class="list-group" v-if="ListSugestoes.length">
                    <li class="list-group-item" v-for="sugestoes in ListSugestoes" :key="sugestoes.id" @click="selecionar(sugestoes)">
                        {{ sugestoes.nomeProcedimento }}
                    </li>
                    </ul>
                </div>
            <!--Os itens selecionados serão adicionados em uma lista e essa lista será exibida abaixo usando o v-for-->
            <div id="resultado" v-for="item in ListProcedimentoSave" :key="item.id" class="col">
                <div id="procedimento" class="row itens"> 
                <div style="transform: translateY(20%)" class=" icon col-md-1 col-sm-12" > 
                    <p>{{ item.menemonico }}</p>
                </div>
                <div style="transform: translateY(20%)" class="icon col-md-3 col-sm-12"> 
                    <p>{{ item.nomeProcedimento }}</p>
                </div>
                       
                <div style="transform: translateY(20%)" class="icon col-md-3 col-sm-12"> 
                    <p>{{ item.amostraPadrao }}</p>
                </div> 
                <div style="transform: translateY(20%)" class="icon col-md-3 col-sm-12"> 
                    <p>{{ item.metodologia }}</p>
                </div> 
                <div class="icon col-md-2 col-sm-12"> 
                    <button @click="remover(ListProcedimentoSave.indexOf(item))" class="btn btn-danger" ><img  src="../assets/lixeira.png" style="width:25px"></button>
                </div> 
                </div>
                
            </div>
            <div id="botao_salvar">
                <input id="salvar" @click="NovoAtendimento();atendimentoProced()" type="submit" class="btn btn-success" value="Salvar dados">
            </div>
            
        </form>  
    </div>
</div>    
</template>

<script>
import moment from 'moment';
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
            ListProcedimentoSave: [],
            dataAtual: '',
            id: ''
           
        
        }
    },
    

    methods:{

        Modal(){
            this.exibir_modal = !this.exibir_modal
        },

        pushAtendimento(){
            // A Construir
        },

        cancelar(){
            this.medicosol = []
        },
        remover(index){
            this.ListProcedimentoSave.splice(index,1)
        },

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
        
        obterDataAtual(){
            const data = new Date()
            const dataFormatada = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
            console.log(dataFormatada)
            console.log(data)
            console.log(this.dataAtual)
            this.dataAtual =  dataFormatada.toString();
        },

         async buscarPaciente(){
            // Exemplo de como lidar com assincronismo usando async/await

                try {
                    const response = await request.get(`/patient/findByCPF/${this.cpf}`)
                    console.log(this.cpf)
                    console.log(response.data);
                    this.paciente = response.data
                    if(response.data == ''){
                        this.$toasted.error("Paciente não encontrado!")
                    }
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                }


        },
        async buscarMedicoCrm(){
           
            try {
                    const response = await request.get(`/med/medicoSolicitante/crm/${this.crm}`);
                    this.medicosol = response.data;
                    console.log(response.data);
                } catch (error) {
                    console.error('Erro na requisição Axios', error);
                    this.$toasted.error("Médico não cadastrado =(")
                }
        },
        NovoMedicoAss(){
            //Construindo o Formdata que será enviado
            try{
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
                this.$toasted.success("Médico cadastrado com sucesso!")
                
            })
            }catch(error){
                this.$toasted.error("Opps! Algo deu errado!")
            }
            
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
            for (let i = 0; i < this.ListProcedimento.length; i++) {
                if (this.inputProcedimento == this.ListProcedimento[i].nomeProcedimento) {
                    this.ListProcedimentoSave.push(this.ListProcedimento[i]);
                    console.log("Correspondência encontrada");
                break; // Importante: interromper o loop após encontrar uma correspondência
                }else{
                    console.log("socorro!")
                }
            }

            
            console.log(this.ListProcedimento[0].nomeProcedimento)
            console.log(this.ListProcedimentoSave.type)
            console.log(this.inputProcedimento.type)
        },
        async NovoAtendimento(){
            console.log(this.ListProcedimentoSave)
            
            
                const formdata = new FormData()
                formdata.append('date', this.dataAtual)
                formdata.append('active',true)
                formdata.append('procedimento',this.ListProcedimentoSave)
                formdata.append('medicoSolicitante',this.medicosol[0].id)
                formdata.append('paciente',this.paciente[0].id)
                
            //Enviando
                const response = await request.post('/atendimento',formdata)
                console.log(response.data.id)
                this.id = response.data.id
                this.atendimentoProced();
                this.$toasted.success("Atendimento Enviado!")

                
            //Construindo o Formdata que será enviado
            
           
            
            //ENVIO A LISTA DE ATENDIMENTOS E ASSOCIO AO ATENDIMENTO
            
        },

        atendimentoProced(){
            request.post(`/atdpr/${this.id}`,this.ListProcedimentoSave)
            .then(({dados})=>{
                    console.log(dados)
                })
            
            
        }
        
    },
    mounted(){
        this.buscarProced();
        this.obterDataAtual();
    }
    

}
</script>



<style scoped>

#listaflutuante{
    position: relative;
}

#botao_salvar{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.labell{
    margin-bottom: 5px;
}
#procedimento{
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: aquamarine;
    margin-right:  10px;
    margin-left: 10px;
}

.icon{
    text-align: center;

}
.itens{
   border-radius: 10px;
}

.input-group{
    position: relative;
    width: 100%;
}

.botoes{
    background: transparent; 
    border: none;
    margin-right: 5px;
    position: absolute;
    top: 0;
    right: 0;
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

#formulario_paciente{
    background-color: #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    height: 80%;
    margin: 0 auto;
}

#resultado{
    border-radius: 8px;
    background-color: white;
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
