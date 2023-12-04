<<template>
  <div>
    <h2>Lista de Atendimentos</h2>
    <div id="burger_table" v-if="atendimentos">
      <div id="resultado" v-for="item in atendimentos" :key="item.id" class="col">
        <div class="row itens" >
          <div  class=" icon col-md-3 col-sm-12">
              <p>Nome do Paciente</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>Data do Atendimento</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>Email</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>Telefone</p>
            </div>
        </div>
          <div id="procedimento" class="row itens">
            <div  class=" icon col-md-3 col-sm-12">
              <p>{{ item.paciente.fullName }}</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>{{ item.date }}</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>{{ item.paciente.email}}</p>
            </div>
            <div class="icon col-md-3 col-sm-12">
              <p>{{ item.paciente.telephone}}</p>
            </div>
          </div>
          </div>
        </div>
          <div id="Info" v-else>
          <h2 >Ainda não há atendimentos cadastrados</h2>
        </div>
    </div>


</template>

<script>

import request from '../router/Requests'
export default{
    name: "Dashboard",
    data(){
      return{
        atendimentos: [], 
        procedimentos: [],
        ListProcedimento: [],
        procedi: []
      }
    },
    components:{

    },
    methods:{
      async buscar(){
        try {
        const response = await request.get(`/atendimento`)
        this.atendimentos = response.data
        console.log(response.data)
      } catch (error) {
        this.$toasted.error("Paciente não encontrado!")
        console.error('Erro na requisição Axios', error);
      }
    },
    async buscarPr(){
        try {
        const response = await request.get(`/atdpr/list`)
        this.procedimentos = response.data
        
        console.log(response.data)
      } catch (error) {
        this.$toasted.error("Erro")
        console.error('Erro na requisição Axios', error);
      }
    },
    async buscarProced() {

try {
  const response = await request.get(`/procedimento`);
  console.log(response.data)
  this.ListProcedimento = response.data
  for (var i = 0; response.length; i++) {
    //Captar todas as Strings para adicionar na lista
  }
} catch (error) {
  console.error('Erro na requisição Axios', error);
}
},

     
      
    },
    mounted(){
     this.buscar()
     this.buscarProced()
     this.buscarPr()
    }
}


</script>

<style scoped>

#Info{
    display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
}

#resultado {
  border-radius: 8px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;

}
</style>