<template>
  <el-container class="login">
    <!-- <canvas class="background"></canvas> -->
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="2"
      linesColor="#FFFFFF"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
      class="background">
    </vue-particles>
    <div class="main">
      <h1>系统登录</h1>
      <div
        class="input-item"
        :class="{'hidden':warning.account}">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model="account"
          placeholder="请输入手机号或邮箱"
          @blur="checkAccount">
        </el-input>
        <el-alert
          v-if="warning.account"
          title="用户名格式不正确"
          type="error"
          :closable="false"
          style="background-color: white">
        </el-alert>
      </div>
      <div
        class="input-item"
        :class="{'hidden':warning.password}">
        <el-input
          :class="{'hidden':warning.password}"
          prefix-icon="el-icon-s-help"
          show-password
          v-model="password"
          placeholder="请输入密码"
          @blur="checkPassword">
        </el-input>
        <el-alert
          v-if="warning.password"
          title="密码格式不正确"
          type="error"
          :closable="false"
          style="background-color: white">
        </el-alert>
      </div>
      <div class="input-item">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
// const Particles = require('particlesjs')
// import VueParticles from 'vue-particles' // 星空背景
export default {
  name: 'login',
  data () {
    return {
      phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
      emailReg: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
      account: 'admin@test.com',
      password: 'admin',
      warning: { //
        account: false,
        password: false
      }
    }
  },
  methods: {
    login () { // 登录
      let method
      if (this.password.length < 5) return
      else if (this.phoneReg.test(this.account)) method = '1' // 手机号校验
      else if (this.emailReg.test(this.account)) method = '2' // 邮箱校验
      else return
      this.$axios.post(this.$url('LOGIN'), { // methods 1:手机号 2邮箱
        account: this.account,
        password: this.password,
        method
      }).then(res => {
        if (res.code === '200') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$store.commit('chgLoginStatus', true) // 改变状态为已登录
          this.$router.push('/Homepage')
        } else { // 失败
          this.$message.error(res.msg)
        }
      })
    },
    checkAccount () { // 检查账号
      const phoneRes = this.phoneReg.test(this.account)
      const emailRes = this.emailReg.test(this.account)
      if (phoneRes || emailRes) this.warning.account = false
      else this.warning.account = true
    },
    checkPassword () { // 检查密码
      if (this.password.length >= 5) this.warning.password = false
      else this.warning.password = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width: 100%
  height: 100%
  // background-image: url('/img/home-page.jpg')
  // background-repeat: no-repeat
  // background-size: cover
  background: rgb(50, 64, 87)
  .background
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 0
  .main
    width: 370px
    height: 290px
    background: #fff
    margin: 0 auto
    margin-top: 200px
    padding: 10px 0
    border-radius: 5px
    z-index: 5
    .input-item
      width: 320px
      margin: auto
      margin-bottom: 35px
      z-index: 10
      button
        width: 100%
        z-index: 10
    .hidden
      margin-bottom: 0
</style>
