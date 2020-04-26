<template>
  <div>
    <mt-tabbar class="bar" fixed v-model="selected">
      <mt-tab-item id="find" @click.native="goto('/find')">
        <i slot="icon" class="iconfont icon-wangyiyunyinle"></i>
        发现
      </mt-tab-item>
      <mt-tab-item id="my" @click.native="goto('/my')">
        <i slot="icon" class="iconfont icon-yinle"></i>
        我的
      </mt-tab-item>
      <mt-tab-item id="account" @click.native="goto('/account')">
        <i slot="icon" class="iconfont icon-renwu"></i>
        账号
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default{
  data: function () {
    return {
      selected: 'find'
    }
  },
  methods: {
    goto (path) {
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.replace(path)
      }
    }
  },
  beforeMount () {
    if (this.$router.currentRoute.fullPath === '/find') {
      this.selected = 'find'
    }
    if (this.$router.currentRoute.fullPath === '/my') {
      this.selected = 'my'
    }
    if (this.$router.currentRoute.fullPath === '/account') {
      this.selected = 'account'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixins'
i.iconfont
  font-size 22px
.mint-tabbar
  top-border-1px(#d6d6d6)
  &>.mint-tab-item.is-selected
    color $red
    background-color transparent
    & i
      background-color $red
      border-radius 50%
      color #fff
.bar
  background-color $gray
  color $darkgray
</style>
