<template>
    <div class="principal"> 
    <h1>Cadastro Procedimento</h1>
    <div id="formulario_procedimento"> 
        <form class="formulario" @submit="salvarProced()">
            <div class="row"> 
                <div class="col-md-4 col-12 col-sm-12">
                    <label>Mnemônico*</label>
                    <input type="text" class="form-control" placeholder="999.999.999.99" required>
                </div>
                <div class="col-md-8 col-12">
                    <label>Nome Procedimento</label>
                    <input type="text" class="form-control" placeholder="Nome Completo" required>
                </div>
                <div class="col-md-12 col-sm-12"> 
                    <label>Tipo de Amostra*</label>
                    <select class="form-select" required>
                        <option selected>Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                </div>
                
                <div class="col-md-12 col-sm-12">
                    <label>Observação</label>
                    <textarea class="form-control" rows="4"></textarea>
                </div>
                <div id="salvar"> 
                    <input type="submit" class="btn btn-success large">
                </div>
            </div>  
        </form>
</div>
</div>
</template>

<script>
export default{
    name: 'CadastroProce'
}
</script>

<style scoped>

#formulario_procedimento{
    background-color: #D9D9D9;
    border-radius: 5px;
    padding: 10px;
    height: 80%;
}

.principal{

}
</style>