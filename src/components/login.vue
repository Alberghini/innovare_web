<template>
  <div class="login">
      <div class="container-fluid">
          <div class="row">
              <div id='loginForm' class="col-md-4 offset-md-4">

                  <div class="row center">
                      <div class="col-md-12">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label v-bind:class="{'btn': true, 'btn-primary': user.isAdmin, 'btn-outline-primary': !user.isAdmin}" v-on:click="user.isAdmin = true">
                                    <input type="radio" name="options" id="option1" autocomplete="off" checked> Sou administrador
                                </label>
                                <label v-bind:class="{'btn': true, 'btn-primary': !user.isAdmin, 'btn-outline-primary': user.isAdmin}" v-on:click="user.isAdmin = false">
                                    <input type="radio" name="options" id="option2" autocomplete="off"> Sou funcionário
                                </label>
                            </div>
                      </div>
                  </div>
                  <br>
                  <div class="card">
                    <div class="card-body">
                        <h4 class="card-title center">Login</h4>
                        <div class="row">
                            <div class="col-md-12">
                                <img src="../assets/brand.png" class='logo' alt="">
                            </div>
                        </div>
                        <br>
                        <div class="alert alert-danger" role="alert" v-show="errorMessage">
                            <strong>Login</strong> ou <strong>senha</strong> incorreto
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" v-model="user.email" placeholder="email@domain.com">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Senha</label>
                            <input type="password" class="form-control" v-model="user.password" placeholder="**********">
                        </div>
                        <br>
                        <div class="row">
                            <div class="offset-md-4 col-md-4">
                                <button type="button" v-on:click="login()" class="btn btn-primary btn-block"> Entrar <ArrowTopRight/></button>
                            </div>
                        </div>
                    </div>
                    </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
// import router from '../main.js'
export default {
  name: 'Login',
  data(){
    return {
        user: {
            isAdmin: false,
            email: '',
            password: ''
        },
        errorMessage: false
    }
  },
  created(){
      localStorage.logged = false;
      localStorage.isAdmin = false;
      localStorage.email = false;
  },
  methods:{
      login: function (){
        this.axios.get('http://localhost\\innovare_ws\\manageLogin.php', {params: {isAdmin: this.user.isAdmin, email: this.user.email, password: this.user.password}}).then((res) => {
            if(res.data) {
                localStorage.logged = true;
                localStorage.id = res.data.id;
                localStorage.email = res.data.email;
                localStorage.name = res.data.name;

                if(this.user.isAdmin){
                    localStorage.isAdmin = true;
                    this.$router.push('/admin/welcome');
                } else {
                    localStorage.isAdmin = false;
                    this.$router.push('/worker/welcome');
                } 
                
            } else this.errorMessage = true;
        })
        
      }
  }
}
</script>
<style>
    #loginForm{
        margin-top: 80px;
    }
    .center{
        text-align: center;
    }
    .logo{
        width: 100%;
    }
    .card{
        background-color: black;
        color: white;
    }
</style>
