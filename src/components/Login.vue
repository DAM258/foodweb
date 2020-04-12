<template>
    <div style="display: flex;justify-content: center;margin-top: 100px">
      <el-card class="box-card" style="width: 500px;">
        <div slot="header" class="clearfix">
          <span style="float: left;">登录</span>
          <span style="float: right;">老八美食网</span >
        </div>
        <table style="margin: 0 auto;">
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="account" placeholder="请输入用户名"></el-input>
            </td>
          <tr>
            <td>密码</td>
            <td>
              <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-button type="primary" style="width: 400px;margin-top: 30px" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
          return{
            account:"test",
            pwd:"123456"
          }
        },
        methods:{
          doLogin(){
            let _this = this;
            if(!this.account || !this.pwd){
              this.$message.warning('用户名或者密码不能为空');
              return;
            }

            this.$axios({
              url:'/user/login',
              data:{account:this.account,pwd:this.pwd},
              type:'get',
              success(result){
              /*  _this.$message.success(result)*/
              window.localStorage.setItem('token',result);
              _this.$router.push('/1');
              }


          })
          }
        }
    }
</script>

<style scoped>

</style>
