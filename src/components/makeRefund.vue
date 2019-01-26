<template>
  <div class="makeRefund">
    <div class="container-fluid">
      <br><br><br><br>
      <div class="row">
        <div class="col-md-10 offset-md-2">
          <h2>Pedido de reembolso</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="alert alert-success" role="alert" v-show="successMessage">
              Os pedidos de reembolso foram cadastrados com <strong>sucesso</strong>! Fique à vontade para pedir mais reembolsos se quiser
            </div>
             <div class="alert alert-danger" role="alert" v-show="missingValuesMessage">
              <strong>Oops...</strong> Por favor, preencha todos os dados de todos os reembolsos corretamente
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 offset-2">
          <div v-for="(refund, index) in refunds" v-bind:key="refund.id" class="card text-white bg-info mb-3">
            <div class="card-header">Reembolso #{{index+1}}</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 offset-md-2">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Tipo de reembolso:</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="refund.type">
                      <option v-bind:value="-1" v-bind:selected="true">Selecione</option>
                      <option v-bind:value="refundType.id" v-for="(refundType) in refundTypes" v-bind:key="refundType.id">{{refundType.description}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Valor do reembolso:</label>
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">R$</div>
                      </div>
                      <input type="number" class="form-control" placeholder="0,00" v-model='refund.value'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <button type="button" class="btn btn-info" v-on:click="addRefund()">
            <Plus/> Adicionar Reembolso
          </button> 
          <button type="button" v-show="refunds.length > 1" class="btn btn-danger marginleft" v-on:click="removeRefund()">
            <Delete/> Remover Reembolso
          </button> 
        </div>
      </div>

      <br>
      <hr>
      <div class="row">
        <div class="col-md-12 center">
          <button type="button" v-on:click="reset()" class="btn btn-danger"><Eraser/> Resetar</button> 
          <button type="button" class="btn btn-primary marginleft" v-on:click="save()">Pedir reembolso <ArrowTopRight/></button>
        </div>
      </div>
      <br><br><br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MakeRefund',
  data() {
    return {
      refunds: [
        {
          type: -1,
          value: null,
          id_worker: 1
        }
      ],
      successMessage: false,
      refundTypes: [],
      missingValuesMessage: false
    }
  },
  created(){
    this.axios.get('http://localhost\\innovare_ws\\manageRefund.php').then((res) => {
        if(res.data) {
            this.refundTypes = res.data;
        } else this.errorMessage = true;
    })
  },
  methods: {
    addRefund: function() {
      this.refunds.push({
        type: -1,
        value: null,
        id_worker: 1
      });
    },
    removeRefund: function() {
      this.refunds.pop();
    },
    reset: function() {
      this.refunds = [
        {
          type: -1,
          value: null,
          id_worker: 1
        }
      ];
    },
    verifyRefunds(){
      this.missingValuesMessage = false;
      let err = false;

      for(let i = 0; i < this.refunds.length; i++){
        if(this.refunds[i].type < 1 || this.refunds[i].value == null || this.refunds[i].value == '' || this.refunds[i].value < 1) err = true;

        }
        if(err) this.missingValuesMessage = true;

        return !err;
    },
    save: function(){
      this.successMessage = false;
      if(this.verifyRefunds()){
        this.axios.post('http://localhost\\innovare_ws\\manageAskRefund.php', this.refunds).then((res) => {
          if(res.data) {
            console.log(res.data);
            this.reset();
            this.successMessage = true;
          } else this.errorMessage = true;
        })
      }
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
