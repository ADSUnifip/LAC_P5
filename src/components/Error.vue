<template>
    <div class = 'container'>
        <h1>Opps! Não nada aqui!</h1>
        <router-link to="/">Tela de login</router-link>
    </div>
</template>

<script>
export default{
    name: 'Error'
}
</script>

<style scoped>
    .container{
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>


