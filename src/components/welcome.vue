<template>
  <div class="welcome">
    <div class="container-fluid">
      <br><br><br><br>
      <div class="row welcome">
        <h1>
          Bem-vindo {{name}} !
        </h1>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  data() {
    return {
      name: localStorage.name
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
  .welcome{
    margin-left: 20px;
  }
</style>
