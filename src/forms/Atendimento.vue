<template>
    <div> 
    <h1>Novo Atendimento</h1>
    <div class="container"> 
        <form id="formulario_paciente" > 
            <div id="pesquisar" class="row"> 
                <div class="col-md-10"> 
                    <input type="text" class="pesquisar form-control" placeholder="Pesquise paciente.." required >
                </div>
                <div class="col-md-2"> 
                    <button class=" pesquisar btn btn-primary">Pesquisar</button>
                </div>
            </div>
            <div id="resultado" v-show="true" class="row"> 
                <div class="col-md-3 col-sm-12"> 
                    <h5>Nome Completo</h5>
                    <p>Wallenon Germano</p>
                </div>
                <div class="col-md-3 col-sm-12"> 
                    <h5>Data de Nascimento</h5>
                    <p>20/04/2003</p>
                </div>
                       
                <div class="col-md-3 col-sm-12"> 
                    <h5>Cpf</h5>
                    <p>14797993430</p>
                </div> 
                <div class="col-md-3 col-sm-12"> 
                    <h5>Telefone</h5>
                    <p>83996587412</p>
                </div>
            </div>
            <div id="medico_solict" class="row">
                <div class="col-md-8"> 
                    <input type="text" id="ps_medico" class="form-control" placeholder="Pesquisar Médico Solicitante" >
                </div> 
                
                <div class="col-md-4"> 
                    <button id="open_modal" type="button" class="btn btn-primary" @click="ExibirModal()">
                    <span class="icon-play-white _hover"></span>
                    <span>Novo</span>
                    </button>
                    <button id="slect_medico" class="btn btn-primary">Selecionar Médico</button>
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
                            <input type="text" class="form-control" placeholder="Nome Completo do Médico">
                        </div>
                        <div class="col-md-2"> 
                            <input type="text" class="form-control" placeholder="UF">
                        </div> 
                    </div>
                    <div id="n_conselho" class="row"> 
                        <div class="col-md-8"> 
                            <input type="number" class="form-control" placeholder="Numero do Conselho">
                        </div>
                        <div class="col-md-4"> 
                            <button id="bt_salvar_cx" style="left: 0;" class="btn btn-success">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div>
               
            </div>
            <div id="adicionar_procedimento" class="row"> 
                <div class="col-md-8"> 
                <input type="text" id="ps_medico" class="form-control col-sd-6" placeholder="Pesquisar Procedimento" required>
                </div>
                <div class="col-md-4"> 
                    <button class="btn btn-primary">
                    <span class="icon-play-white _hover"></span>
                    <span>Novo</span>
                    </button>
                    <button class="btn btn-primary">Adicionar Procedimento</button>
                </div>
            </div>
            <!--Os itens selecionados serão adicionados em uma lista e essa lista será exibida abaixo usando o v-for-->
            <div class="list" v-for="item in ListProcedimento" :key="item"> 
                <div id="list_proc" class="row"> 
                    <div class="col-md-3 col-sm-12"> 
                        <h6>GLI</h6>
                    </div>
                    <div class="col-md-3 col-sm-12"> 
                        <h6>Glicose</h6>
                    </div>
                        
                    <div class="col-md-3 col-sm-12"> 
                    <h6>154567899999</h6>
                    </div> 
                    <div class="col-md-3 col-sm-12"> 
                        <button class="btn btn-danger">Remover</button>
                    </div>
                </div>      
            </div>
            
            <div>
                <input type="submit" class="btn btn-success" value="Salvar dados">
            </div>
        </form>  
    </div>
</div>    
</template>

<script>

export default{
    name: 'Atendimento',
    components:{
       
    },
    data(){
        return{
            resultado : true,
            ListProcedimento: ["Glicose"],
            exibir_modal: false
           
        
        }
    },
    methods:{
        removerItem(){

        },
        ExibirModal(){
            this.exibir_modal = !this.exibir_modal;
        },
        FecharModal(){
            this.exibir_modal = !this.exibir_modal;
        }
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

#cabecalho{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom:10px ;
}

#item{
    background-color: white;
    margin-left: 30px;
    margin-right: 30px;
}
.list{
    margin: 20px;
    background-color: white;
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
}
#pesquisar{
    background-image: none;
}
#formulario_paciente{
    background-color: #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    height: 80%;
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
