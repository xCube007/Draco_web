<template>
  <el-container class="main">
    <el-header>
      <el-radio-group
        v-model="isCollapse"
        class="switch">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-button
        type="danger"
        class="out"
        @click="signOut">
        退出登录
      </el-button>
    </el-header>
    <el-container>
      <el-menu
        class="aside"
        default-active="0"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-menu"></i>
          <span slot="title">博客管理</span>
        </el-menu-item>
      </el-menu>
      <el-main>
        <h2 v-if="showDes">Keep It Simple And Stupid!</h2>
        <h2 v-if="showDes">And</h2>
        <h2 v-if="showDes">Always be humble</h2>
        <h2 style="font-size: 48px" v-if="showDes">Talk is cheap，show me the code!</h2>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  name: 'homepage',

  data () {
    return {
      isCollapse: false // 侧边栏的显示隐藏
    }
  },
  computed: {
    showDes () {
      return this.$route.path === '/Homepage'
    }
  },
  created () {
    // 在这里用token获取用户信息
    // this.$store.commit('chgLoginStatus', true)
    this.getUserInfo()
  },
  methods: {
    signOut () { // 退出登录确认
      this.$confirm('即将退出登录，是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$store.commit('chgLoginStatus', false) // 改变状态为未登录
        localStorage.clear()
        this.$router.replace('/login')
      }).catch(() => {})
    },
    handleSelect (index) {
      console.log(index)
      switch (index) {
        case '1':
          this.$router.push('/Homepage/user')
          break
        case '2':
          console.log('视频')
          break
        case '3':
          console.log('留言')
          break
        case '4':
          console.log('博客')
          break
        default:
          break
      }
    },
    getUserInfo () {
      this.$axios.get(this.$url('GET_USER_INFO')).then(res => {
        if (res.code === '200') {
          this.$store.commit('chgLoginStatus', true)
        }
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width: 100%
    height: 100%
    // display: flex
    header
      border-bottom: 1px solid #dcdfe6
      display: flex
      align-items: center
      position: relative
      .switch
        float: left
      .out
        position: absolute
        right: 20px
    .aside:not(.el-menu--collapse)
      width: 200px
      min-height: 400px
    main
      // flex: 1
      position: relative
</style>
