<template>
  <div>
    <top></top>
    <div class="account">
      <div v-if='!isLogin' class="non-online">
        <p>登录网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
        <span @click='$router.push("/login")'>立即登陆</span>
      </div>
      <div v-if='isLogin' class="userInfo" :style="{backgroundImage:'url('+userInfo.backgroundUrl+')'}">
        <img :src="userInfo.avatarUrl">
        <div>
          <p>{{userInfo.nickname}}</p>
          <p>{{userInfo.signature}}</p>
          <span>关注 {{userInfo.follows}}</span>
          <span>粉丝 {{userInfo.followeds}}</span>
        </div>
      </div>
    </div>
    <hr class="line" />
    <div class="three-type">
      <div><div><span class="iconfont icon-buoumaotubiao12"></span><div>消息</div></div></div>
      <div><div><span class="iconfont icon-shangcheng"></span><div>商城</div></div></div>
      <div><div><span class="iconfont icon-pifu"></span><div>皮肤</div></div></div>
    </div>
    <div class="select">
      <mt-cell title="设置" is-link to=''>
        <span slot="icon" class="iconfont icon-shezhi"></span>
      </mt-cell>
      <mt-cell title="夜间模式">
        <span slot="icon" class="iconfont icon-yejianmoshi"></span>
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="定时关闭" is-link to=''>
        <span slot="icon" class="iconfont icon-iconfonthekricondingshi2eps"></span>
      </mt-cell>
      <mt-cell title="关于" is-link to=''>
        <span slot="icon" class="iconfont icon-guanyu"></span>
      </mt-cell>
    </div>
    <span v-if="isLogin" class="isLogin" @click='logout()'>退出登陆</span>
  </div>
</template>

<script>
import top from '../../components/top'
import { MessageBox } from 'mint-ui'
import {mapState, mapActions} from 'vuex'
import {logout} from '../../api/index'
export default{
  data: function () {
    return {
      value: true,
      isLogin: false
    }
  },
  methods: {
    logout: function () {
      MessageBox({
        title: '提示',
        message: '确定退出登录?',
        showCancelButton: true
      }).then((data) => {
        if (data === 'confirm') {
          logout()
          this.isLogin = false
          this.setUserInfo({})
          localStorage.setItem('isLogin', false)
        }
      })
    },
    ...mapActions({
      setUserInfo: 'setUserInfo'
    })
  },
  created () {
    if (this.userInfo.userId) {
      this.isLogin = true
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  watch: {
    userInfo (value) {
      if (value.userId) {
        this.isLogin = true
      }
    }
  },
  components: {top}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mint-switch-input:checked
  &+.mint-switch-core
    border-color #DD001B
    background-color #DD001B
.select .iconfont
  vertical-align top
  &+span
    vertical-align top
.mint-msgbox
  border-radius 15px
.mint-msgbox-confirm
  color #DD001B
  &:active
    color #DD001B
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins'
.account
  height: 130px;
  margin-top: 50px;
  padding-top: 12px;
  box-sizing: border-box;
.icon-shezhi
  vertical-align top
  &+span
    vertical-align top
.three-type
  display flex
  margin-top 10px
  margin-bottom 10px
  &>div
    flex 1
    text-align center
    font-size 12px
    .iconfont
      color #DD001B
      font-size 35px
.line
  border none
  margin-top 0
  border-bottom 1px solid #e2e2e2
.non-online
  text-align center
  font-size 14px
  &>p
    margin 0
    padding 5px
  &>span
    display inline-block
    width 90%
    height 30px
    background-color #DD001B
    border-radius 15px
    line-height 30px
    color #fff
.isLogin
  display block
  margin 10px auto
  width 90%
  height 30px
  background-color #DD001B
  border-radius 15px
  line-height 30px
  color #fff
  text-align center
.userInfo
  background-size 100% auto
  height 100%
  border-radius 5px
  position relative
  &>img
    width 80px
    height 80px
    border-radius 50%
    left 10px
    top 50%
    transform translateY(-50%)
    position absolute
  &>div
    color #fff
    margin-left 110px
    position absolute
    top 50%
    transform translateY(-50%)
    &>p
      margin 0
      padding 0
    &>p:last-of-type
      font-size 12px
      opacity 0.8
    &>span
      margin-right 10px
      font-size 10px
      opacity 0.6
</style>
