<template>
  <div class="index" @click="toLogin">
    <transition name="fade">
      <img
        v-if="showBackground"
        class="img-l"
        src="img/dragon_L.png">
    </transition>
    <transition name="fade">
      <img
        v-if="showBackground"
        class="img-r"
        src="img/dragon_R.png">
    </transition>
    <!-- 备案号 -->
    <div style="width:800px;margin:0 auto; padding:20px 0;position:absolute;bottom:0;left:0;right:0;">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802029524" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">©2019 draco.cn All rights reserved. 京ICP备19037235号 京公网安备 11010802029524号<img src="img/icon.png" style="float:right;"/></p></a>
    </div>
    <!-- 备案号 -->
  </div>
</template>

<script>
export default {

  name: 'index',

  data () {
    return {
      showBackground: false
    }
  },
  mounted () {
    this.showBackground = true // 背景的进入动画
  },
  methods: {
    toLogin () { // 去登录页面
      this.showBackground = false
      setTimeout(() => {
        this.$router.push('/login')
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  width: 100%
  height: 100%
  position: relative
  overflow: hidden
  .img-l
    position: absolute
    top: 0
    left: 0
    height: 100%
    transition: all .5s
  .img-r
    position: absolute
    top: 0
    right: 0
    height: 100%
    transition: all .5s
  .img-l:hover,
  .img-r:hover
    cursor: pointer
    transform: scale(1.1)

.fade-enter, .fade-leave-to
  opacity: 0
  transform: translateY(-50px)
</style>
