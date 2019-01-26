<template>
  <div class="createTypeRefund">
    <div class="container-fluid">
      <br><br><br><br>
      <div class="row">
        <div class="col-md-8 offset-2">
            <h2>
                Criar tipo de reembolso
            </h2>
            <br><br>

            <div class="alert alert-danger" role="alert" v-show="errorMessage">
              <strong>Oops...</strong> Ocorreu um erro no sistema. Por favor, contate o suporte
            </div>

            <div class="form-group col-md-8 offset-md-2">
                <label>Tipo de reembolso</label>
                <input type="text" class="form-control" placeholder="Reembolso X" v-model="refundType.description">
            </div>

        </div>
      </div>

      <br>
      <hr>
      <div class="row">
        <div class="col-md-12 center">
          <button type="button" v-on:click="reset()" v-if="!refundType.id" class="btn btn-danger"><Eraser/> Resetar</button> 
          <button type="button" v-on:click="save()" class="btn btn-primary marginleft">Salvar <ArrowTopRight/></button>
        </div>
      </div>
      <br><br><br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateTypeRefund',
  data() {
    return {
      refundType: {
        description: ''
      },
      errorMessage: ''
    }
  },
  created(){
    if(this.$route.params.id){
      this.getRefundById(this.$route.params.id);
    }
  },
  methods: {
    reset: function() {
      this.refundType.description = '';
    },
    save: function(){
      if(this.refundType.id){
        this.axios.put('http://localhost\\innovare_ws\\manageRefund.php', this.refundType).then((res) => {
          if(res.data) {
            this.$router.push({name: 'refundTypesListMessage', params: {message: 2} });
          } else this.errorMessage = true;
        })
      } else {
        this.axios.post('http://localhost\\innovare_ws\\manageRefund.php', this.refundType).then((res) => {
          if(res.data) {
            this.$router.push({name: 'refundTypesListMessage', params: {message: 1} });
          } else this.errorMessage = true;
        })
      }
    },
    getRefundById: function(id){
      this.axios.get('http://localhost\\innovare_ws\\manageRefund.php', {params: {id: id}}).then((res) => {
        if(res.data) {
          console.log(res.data);
          this.refundType.description = res.data.description;
          this.refundType.id = res.data.id;
        } else this.errorMessage = true;
      })
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
</style>
