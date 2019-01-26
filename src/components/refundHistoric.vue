<template>
  <div class="refundHistoric">
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
                            <div class="col-md-3 left">
                                <button type="button" class="btn btn-danger btn-block" data-dismiss="modal" v-on:click="updateStatus(details.id, '3')">Recusar</button>
                            </div>
                            <div class="col-md-3 offset-md-6 right">
                                <button type="button" class="btn btn-success btn-block" data-dismiss="modal" v-on:click="updateStatus(details.id, '2')">Aceitar</button>
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
                <div class="col-md-8">
                    <h5 class="modal-title">Histórico de reembolso</h5>
                </div>
                <div class="col-md-4">
                    <button v-show="statusShow == 2" v-on:click="changeStatusShow()" v-bind:class="{'btn btn-block': true, 'btn-danger': true}"><EyeOutline/> Mostrar Reprovados</button>
                    <button v-show="statusShow == 3" v-on:click="changeStatusShow()" v-bind:class="{'btn btn-block': true, 'btn-success': true}"><EyeOutline/> Mostrar Aprovados</button>
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
                            
                    <tr v-show="statusShow == expense.status_id" v-bind:class="{'approved': expense.status_id == 2, 'reproved': expense.status_id == 3}" v-for="(expense, index) in expenses" v-bind:key="expense.id">
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
  name: 'RefundHistoric',
  data() {
    return {
        statusShow: 2,
        expenses: [],
        details: {}
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
    changeStatusShow: function(){
        if(this.statusShow == 2) this.statusShow = 3;
        else this.statusShow = 2;
    },
    selectDetails: function(id){
        for(let i = 0; i < this.expenses.lenght; i++){
            if(this.expenses[i].id == id) this.details = this.expenses[i];
        }
    },
    bringRefunds: function(){
        this.axios.get('http://localhost\\innovare_ws\\manageRefundHistoric.php').then((res) => {
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
      background-color: rgb(197, 255, 197);
  }
  .reproved{
      background-color: rgb(255, 149, 149);
  }
</style>
