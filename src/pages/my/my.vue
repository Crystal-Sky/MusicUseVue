<template>
  <div>
    <top></top>
    <div class="my-content">
      <mt-cell title="本地音乐" is-link to=''>
        <span slot="icon" class="iconfont icon-cat-4"></span>
      </mt-cell>
      <mt-cell title="最近播放" is-link to=''>
        <span slot="icon" class="iconfont icon-zuijinbofang"></span>
      </mt-cell>
      <mt-cell title="我的电台" is-link to=''>
        <span slot="icon" class="iconfont icon-wodediantai"></span>
      </mt-cell>
      <mt-cell title="我的收藏" is-link to=''>
        <span slot="icon" class="iconfont icon-shoucang"></span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import top from '../../components/top'
export default{
  data: function () {
    return {}
  },
  components: {top}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.my-content
  margin-top 39px
</style>
