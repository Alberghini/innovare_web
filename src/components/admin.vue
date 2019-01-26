<template>
  <div class="worker">
    <div class="container-fluid">
        <div class="row topMenu">
            <div class="col-md-4 offset-md-4 center">
                <h1 class='center'>Innovare</h1>
            </div>
            <div class="col-md-3 right outButton">
                <p class='right'>Usuário: {{name}}</p>
            </div>
            <router-link :to="{ name: '/'}" class="col-md-1 bg-danger center outButton">
                <h4>Sair</h4>
            </router-link>
        </div>
        <div class="row maxHeight">
            <div class="col-md-2 sideMenu">
                <div class="row">
                    <br>
                    <div class="col-md-12 center">
                        <br><br>
                        <h3><GestureDoubleTap />Navegar</h3>
                        <br><br><br><b></b>
                    </div>
                    <router-link :to="{ name: 'welcomeAdmin'}" class="col-md-12 menuItem" class-active="active" exact>
                        <Home/> Início
                    </router-link>
                    <router-link :to="{ name: 'refundList'}" class="col-md-12 menuItem" class-active="active" exact>
                        <CashRefund/> Pedidos de Reembolso
                    </router-link>
                    <router-link :to="{ name: 'refundHistoric'}" class="col-md-12 menuItem" class-active="active" exact>
                        <History/> Histórico de Reembolso
                    </router-link>
                    <router-link :to="{ name: 'refundTypesList'}" class="col-md-12 menuItem" class-active="active" exact>
                        <FormatListBulletedType/> Tipos de Reembolso
                    </router-link>
                </div>
            </div>
            <div class="col-md-10 content">
                <router-view class="view"></router-view>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Worker',
  data() {
    return {
      email: localStorage.email,
      name: localStorage.name
    }
  }
}
</script>
<style>
html,body { height:100vh; }
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
  .topMenu{
      background-color: rgb(29, 55, 102);
      color: white;
  }
  .maxHeight {
      height: 80vh !important;
  }
  .sideMenu{
      background-color: rgb(80, 115, 179);
      color: black;
      height: 100vh !important;
  }
  .menuItem{   
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: solid 1px black;
  }
  .menuItem:hover{
      background-color: rgb(96, 124, 177);
      cursor: pointer;
      color: black;
      text-decoration: none;
  }
  .menuItem:link{
      padding-top: 12px;
      padding-bottom: 12px;
      background-color: rgb(0, 0, 0);
      text-decoration: none;
      color: white !important;
  }
  a { color: inherit; } 
  .router-link-active{
      background-color: rgb(50, 94, 177);
      color: black;
  }
  .fullWidith{
      width: 100%;
  }
  .outButton{
      padding-top: 10px;
  }
</style>
