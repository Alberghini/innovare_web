<template>
  <div class="refundTypesList">
    <div class="container-fluid">
      <br><br><br><br>
      <div class="row">
        <div class="col-md-8 offset-2">
            <div class="row">
                <div class="col-md-8">
                    <h2>Lista de tipos de reembolso</h2>
                </div>
                <div class="col-md-4">
                    <router-link :to="{name: 'createTypeRefund'}">
                        <button class='btn btn-primary btn-block'><Plus/> Cadastrar novo tipo</button>
                    </router-link>            
                </div>
            </div>
            <br>
            <div class="alert alert-danger" role="alert" v-show="errorMessageString.length > 0">
              {{errorMessageString}}
            </div>
            <div class="alert alert-success" role="alert" v-show="successMessage">
              Reembolso removido com<strong> sucesso</strong>
            </div>
            <div class="alert alert-success" role="alert" v-show="successInsertMessage">
              Tipo de reembolso cadastrado com<strong> sucesso!</strong>
            </div>
            <div class="alert alert-success" role="alert" v-show="successEditMessage">
              Tipo de reembolso editado com<strong> sucesso!</strong>
            </div>
            <br>
            <table class="table">
                <thead class="thead-dark">
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-for="(type, index) in types" v-bind:key="type.id">
                        <td>{{index+1}}</td>
                        <td>{{type.description}}</td>
                        <td>
                            <router-link :to="{name: 'createTypeRefundId', params: {id: type.id}}">
                                <button class='btn btn-primary' ><Pencil/> Editar</button>
                            </router-link>
                            <button class='btn btn-danger marginleft' v-on:click="removeType(type.id)"><Delete/> Remover</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <br><br><br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RefundTypesList',
  data() {
    return {
      types: [],
      successMessage: false,
      errorMessage: false,
      successEditMessage: false,
      successInsertMessage: false,
      errorMessageString: ''
    }
  },
  created(){
      this.getRefundTypes();
      if(this.$route.params.message == 1){
          this.successInsertMessage = true;
      }
      if(this.$route.params.message == 2){
          this.successEditMessage = true;
      }
  },
  methods: {
        getRefundTypes: function(){
            this.axios.get('http://localhost\\innovare_ws\\manageRefund.php').then((res) => {
                if(res.data) {
                    this.types = res.data;
                } else this.errorMessage = true;
            })
        },
        removeType: function(id){
            this.resetMessages();
            this.axios.delete('http://localhost\\innovare_ws\\manageRefund.php', {params: {id: id}}).then((res) => {
                if(!res.data.err) {
                    this.successMessage = true;
                    this.getRefundTypes();
                } else{
                    this.errorMessageString = res.data.message;
                }
            })
        },
        resetMessages: function(){
            this.successMessage = false;
            this.errorMessage = false;
            this.successInsertMessage = false;
            this.successEditMessage = false;
        }
  }
}
</script>
<style>
  .center{
    text-align: center;
  }
  .marginleft{
    margin-left: 5px;
  }
  .right{
      text-align: right !important;
  }
  .left{
      text-align: left !important;
  }
</style>
