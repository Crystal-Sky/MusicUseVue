<template>
  <div>
    <mt-header fixed title="登录">
      <router-link to="/account" slot="left">
        <mt-button icon='back'></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" is-selected>手机号登录</mt-tab-item>
        <mt-tab-item id="2">邮箱登录</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="login" @click='login()'><span>登录</span></div>
  </div>
</template>

<script>
import {emailLogin, cellphoneLogin, getState, setCookie} from '../../api/index'
import {MessageBox} from 'mint-ui'
import {mapActions} from 'vuex'
export default{
  data: function () {
    return {
      selected: '1',
      phone: '',
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      if (this.selected === '1') {
        if (this.phone === '' || this.password === '') {
          MessageBox('提示', '请输入账号/密码')
        } else {
          cellphoneLogin(this.phone, this.password).then(data => {
            this.loginSuccess(data)
          }, () => {
            MessageBox('提示', '账号or密码错误')
          })
        }
      } else {
        if (this.email === '' || this.password === '') {
          MessageBox('提示', '请输入账号/密码')
        } else {
          emailLogin(this.email, this.password).then(data => {
            this.loginSuccess(data)
          }, () => {
            MessageBox('提示', '账号or密码错误')
          })
        }
      }
    },
    loginSuccess: function (data) {
      setCookie('token', data.token, 10)
      getState().then(data => {
        this.getUserInfo(data.profile.userId)
      }, () => {})
      this.phone = this.email = this.password = ''
      this.$router.replace('/account')
      localStorage.setItem('isLogin', true)
    },
    ...mapActions({
      setUserInfo: 'setUserInfo',
      getUserInfo: 'getUserInfo'
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.mint-tab-item-label
  font-size 16px
.mint-msgbox
  border-radius 15px
.mint-msgbox-confirm
  color #DD001B
  font-size 16px
  &:active
    color #DD001B
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins'
.mint-header
  background-color #fff
  color #000
  bottom-border-1px($gray)
.container
  margin-top 60px
.mint-navbar>.mint-tab-item.is-selected
  border-bottom 1px solid #DD001B
  color #DD001B
.login
  text-align center
  &>span
    display inline-block
    width 100%
    height 30px
    background-color #DD001B
    border-radius 15px
    line-height 30px
    color #fff
    text-align center
    margin-top 15px
</style>
