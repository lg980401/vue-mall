<template>
  <div class="box">
    <el-form ref="loginform" :model="Login" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="Login.username" style="width: 380px" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="Login.password" style="width: 380px" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login" :loading="logining">登陆</el-button>
      <el-button type="primary" @click="cz">重置</el-button>
    </el-form>

  </div>

</template>
<script>
  import {
    RequestLogin
  } from "../../request/api.js";
  import {
    setLoginInfo,
    getAccessToken
  } from "../../tools/ls.js";
  export default {
    name: "login",
    components: {},
    data() {
      return {
        logining: false,
        Login: {
          username: "admin",
          password: "123456"
        },
        rules: {
          username: [{
              required: true,
              message: "请输入名称",
              trigger: "blur"
            },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ]
        }
      };
    },
    computed: {},
    watch: {},
    methods: {
      login() {
        this.$refs.loginform.validate(valid => {
          if (valid) {
            this.logining = true;
            this.$store.dispatch('login', this.Login)
              .then(res => {
                const {
                  data,
                  meta
                } = res
                if (meta.msg != 200 && data == "") {
                  //登录失败，提示错误信息
                  this.$message({
                    message: meta.msg,
                    type: 'error'
                  })
                  this.logining = false;
                } else {
                  //登陆成功
                  //保存token
                  setLoginInfo(data.token);
                  //保存登陆信息


                  //提示成功信息
                  this.$message({
                    message: meta.msg,
                    type: 'success'
                  })

                  this.logining = false;
                  this.$router.push({
                    path: '/index',
                    query: {
                      username: data.username
                    }
                  })
                }
              })
          }

        })
      },

      cz() {
        this.$refs.loginform.resetFields();
      }
    },
    created() {},
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
  };

</script>
<style scoped>
  .el-form {
    padding-top: 100px;
  }

  .box {
    background-color: #eee;
    width: 600px;
    height: 300px;
    margin: 100px auto;
  }

</style>
