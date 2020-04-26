<template>
  <mt-header :class='{search:flag}' fixed :title="name">
    <span slot="left" :class="['iconfont',sign]"></span>
    <span slot="right" @click="$router.push('/play')">
      <span class="one"></span>
      <i :class="{black:true, play:isPlayingState}" v-for="i in 4" :key="i"></i>
    </span>
  </mt-header>
</template>

<script>
import {mapState} from 'vuex'
export default{
  data: function () {
    return {
      name: '',
      sign: '',
      flag: true
    }
  },
  beforeMount () {
    if (this.$router.currentRoute.fullPath === '/find') {
      this.sign = 'icon-yuyin'
      this.name = '搜索'
      this.flag = true
    }
    if (this.$router.currentRoute.fullPath === '/my') {
      this.sign = 'icon-yuncunchu'
      this.name = '我的音乐'
      this.flag = false
    }
    if (this.$router.currentRoute.fullPath === '/account') {
      this.sign = 'icon-saoyisao'
      this.name = '账号'
      this.flag = false
    }
  },
  computed: {
    ...mapState({
      isPlayingState: state => state.isPlayingState
    })
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
.search>.mint-header-title
  height 22px
  background-color #E2E2E2
  border-radius 10px
  line-height 22px
  color #989898
.icon-yuyin,.icon-saoyisao
  font-size 22px
</style>
<style lang='stylus' rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixins'
.one
  display inline-block
  height 20px
.black
  display inline-block
  width 2px
  background-color #000
  margin 0 2px
  &:nth-of-type(odd)
    height 10px;
  &:nth-of-type(even)
    height 20px
.play
  &:nth-of-type(odd)
    height 10px;
    animation playH 1s linear infinite
  &:nth-of-type(even)
    height 20px
    animation playS 1s linear infinite
.mint-header
  color #000
  background-color #fff
  bottom-border-1px($gray)
@keyframes playH
  0%
    height 20px
  50%
    height 10px
  100%
    height 20px
@keyframes playS
  0%
    height 10px
  50%
    height 20px
  100%
    height 10px
</style>
