<template>
    <div id="burger_table" v-if="resultBurger">
    <div>
      <div id="burger_table_heading">
        <div class="order-id"></div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger_table_rows">
      <div class="burger_table_row" v-for="burger in resultBurger" :key="burger.id">
        <div class="order-number"></div>
        <div>{{ burger.name_client }}</div>
        <div>{{ burger.bread }}</div>
        <div>{{ burger.meat }}</div>
        <div>
          <ul>
            <li>{{ burger.opcionais }}</li>
          </ul>
        </div>
        <div>
          <select name="status" class="status">
            <option v-for="s in status" value="" :key="s.id" :selected="burger.status == s.name">
              {{ s.name }}</option>
          </select>
          <button class="delete-btn" @click="deleteburger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
<div id="Info" v-else>
    <h2 >Ainda não há atendimentos cadastrados</h2>
</div>
</template>

<script>


export default{
    name: "Dashboard",
    components:{

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
</style>