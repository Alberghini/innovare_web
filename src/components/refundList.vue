<template>
  <div class="refundList">
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalhes do Reembolso</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 right">Funcionário: </div>
                        <div class="col-md-6 left">{{details.email}}</div>
                    </div>
                     <div class="row">
                        <div class="col-md-6 right">Tipo de reembolso: </div>
                        <div class="col-md-6 left">{{details.description}}</div>
                    </div>
                     <div class="row">
                        <div class="col-md-6 right">Valor: </div>
                        <div class="col-md-6 left">R$ {{details.value}}</div>
                    </div>
                     <div class="row">
                        <div class="col-md-6 right">Status: </div>
                        <div class="col-md-6 left">{{details.status}}</div>
                    </div>
                </div>
                <div class="modal-footer" v-bind:class="{'modal-footer': true, approved: details.status_id == 2, reproved: details.status_id == 3}">
                    <div class="container-fluid">
                        <div class="row" v-if="details.status_id == 1">
                            <div class="col-md-3 offset-md-2 left">
                                <button type="button" class="btn btn-danger btn-block" data-dismiss="modal" v-on:click="updateStatus(details.id, '3')"><ThumbDownOutline/> Recusar</button>
                            </div>
                            <div class="col-md-3 offset-md-2 right">
                                <button type="button" class="btn btn-success btn-block" data-dismiss="modal" v-on:click="updateStatus(details.id, '2')"><ThumbUpOutline/> Aceitar</button>
                            </div>
                        </div>
                        <div class="row" v-if="details.status_id != 1">
                            <div class="col-md-3 offset-md-9 right">
                                <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
      <br><br><br><br>
      <div class="row">
        <div class="col-md-8 offset-2">
            <div class="row">
                <div class="col-md-12">
                    <h2>Lista de pedidos de reembolso</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-success" role="alert" v-show="successAccepted">
                        O reembolso foi  <strong>ACEITO</strong> com sucesso!
                    </div>
                    <div class="alert alert-success" role="alert" v-show="successRefused">
                        O reembolso foi  <strong>RECUSADO</strong> com sucesso!
                    </div>
                </div>
            </div>
            <br>
            <table class="table">
                <thead class="thead-dark">
                    <th>#</th>
                    <th>Funcionário</th>
                    <th>Tipo de despesa</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-bind:class="{'approved': expense.status == 2, 'reproved': expense.status == 3}" v-for="(expense, index) in expenses" v-bind:key="expense.id">
                        <td>{{index+1}}</td>
                        <td>{{expense.email}}</td>
                        <td>{{expense.description}}</td>
                        <td>{{expense.value}}</td>
                        <td>{{expense.status}}</td>
                        <td>
                            <button class='btn btn-primary' v-on:click="details = expense" data-toggle="modal" data-target=".bd-example-modal-lg"><AccountDetails/> Detalhes</button>
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
  name: 'RefundList',
  data() {
    return {
      expenses: [],
      details: {},
      successAccepted: false,
      successRefused: false
    }
  },
  created(){
    this.bringRefunds();
  },
  methods: {
    addRefund: function() {
        this.refunds.push({});
    },
    removeRefund: function() {
        this.refunds.pop();
    },
    updateStatus: function(id, status){
        this.successAccepted = false;
        this.successRefused = false;
        this.axios.put('http://localhost\\innovare_ws\\manageDecideRefund.php', {id: id, status: status}).then((res) => {
            if(res.data) {
                console.log(res.data);
                this.bringRefunds();
                this.selectDetails(id);
                if(status == 2) this.successAccepted = true;
                else if(status == 3) this.successRefused = true;
            } else this.errorMessage = true;
        })
    },
    selectDetails: function(id){
        for(let i = 0; i < this.expenses.lenght; i++){
            if(this.expenses[i].id == id) this.details = this.expenses[i];
        }
    },
    bringRefunds: function(){
        this.axios.get('http://localhost\\innovare_ws\\manageDecideRefund.php').then((res) => {
            if(res.data) {
                console.log(res.data);
                this.expenses = res.data;
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
  .right{
      text-align: right !important;
  }
  .left{
      text-align: left !important;
  }
  .approved{
      background-color: rgb(170, 226, 170);
  }
  .reproved{
      background-color: rgb(233, 160, 160);
  }
</style>
