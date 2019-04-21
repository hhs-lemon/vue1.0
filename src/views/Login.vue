<template>
  <div>
    <div class="login_wrapper">
      <div class="animate form login_form">
        <section class="login_content">
          <form>
            <h1>管理员登录</h1>
            <div>
              <input v-model="adminName" type="text" class="form-control" placeholder="管理员登录名" required />
            </div>
            <div>
              <input v-model="adminPwd" type="password" class="form-control" placeholder="管理员登录密码" required />
            </div>
            <div>
              <a @click.prevent="doLogin" class="btn btn-default submit" href="index.html">&nbsp;登&nbsp;录&nbsp;</a>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <div class="clearfix"></div>
              <br />

              <div>
                <h1><img src="../assets/img/user.png"> 学子商城后台管理系统</h1>
                <p>©2017 版权所有，CODEBOY.COM</p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

    import '../assets/css/bootstrap.css'
    import '../assets/css/font-awesome.css'
    import '../assets/css/animate.css'
    import '../assets/css/app.css'
    //引入axios模块
    import axios from 'axios'


  import '../assets/js/jquery.js'

  export default{
    data(){
        return{
            adminName:'admin',
            adminPwd:'123456'
        }
    },
    methods:{
      doLogin(){
          var url=`http://127.0.0.1/teacher_note/22 vuejs/day06/day06ok/xz_admin_v1/data/admin_login.php?aname=${this.adminName}&apwd=${this.adminPwd}`;
          axios.get(url).then((res)=>{
              if(res.data.code===200){//登录成功
                this.$router.push('/main')
              }else{//失败
                  alert('res.data.msg')
              }
          }).catch((err)=>{
              console.log('异步请求失败');
              console.log(err);
          })
//          $.ajax({
//              url:url,
//              success:function(res){
//                console.log('异步请求成功');
//                console.log(res);
//              },
//              error:function(err){
//                console.log('异步请求失败');
//                console.log(err);
//            }
//          })

      }
    },
    mounted(){
    }
}
</script>
 