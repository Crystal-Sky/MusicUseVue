<template>
  <div>
    <top></top>
    <mt-swipe class='my-swipe' :auto="4000">
      <mt-swipe-item v-for='(item,index) in bannerData' :key="index">
        <a :href="item.url"><img :src="item.pic"></a>
      </mt-swipe-item>
    </mt-swipe>
    <div class="three">
      <div><p><span class="iconfont icon-date"></span><span>{{day}}</span></p></div>
      <div><p><span class="iconfont icon-bofangliebiao"></span><span></span></p></div>
      <div><p><span class="iconfont icon-paixingbang"></span><span></span></p></div>
    </div>
    <div class="music-day-list">
       <ul>
         <li v-for='(item,index) in lazyList' :key="index" @click='getListDetail(item.id)'>
           <img v-lazy="item.picUrl">
           <label>{{item.name}}</label>
           <span class="iconfont icon-bofang">{{getPlayCount(item.playCount)}}</span>
         </li>
       </ul>
    </div>
  </div>
</template>

<script>
import top from '../../components/top'
import {getBanners, getPersonalized} from '../../api/index'
export default{
  data: function () {
    return {
      bannerData: {},
      day: 0,
      lazyList: [{name: '', picUrl: '', playCount: 0}]
    }
  },
  methods: {
    getPlayCount: function (playCount) {
      if (playCount >= 100000000) {
        playCount = playCount / 100000000
        return Math.floor(playCount * 10) / 10 + '亿'
      } else if (playCount >= 100000) {
        return parseInt(playCount / 10000) + '万'
      } else {
        return playCount
      }
    },
    getListDetail: function (id) {
      let path = '/songlist/' + id
      this.$router.push(path)
    }
  },
  created () {
    getBanners().then(data => {
      this.bannerData = JSON.parse(JSON.stringify(data.banners))
    }, () => {})
    getPersonalized().then(data => {
      this.lazyList = JSON.parse(JSON.stringify(data.result))
    }, () => {})
    let date = new Date()
    this.day = date.getDate()
  },
  components: {top}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
img
  height 100%
  width 100%
.mint-swipe-indicator
  background #E2E2E2
  opacity 1
.mint-swipe-indicator.is-active
  background #DD001B
</style>
<style lang='stylus' rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins'
.my-swipe
  margin-top 50px
  height 140px
  border-radius 10px
.three
  display flex
  height 60px
  padding-top 10px
  padding-bottom 10px
  border-bottom 1px solid #E2E2E2
  &>div
    flex:1
    background #FFF
    text-align center
    line-height 60px
    &>p
      background #DD001B
      width 50px
      height 50px
      border-radius 50%
      margin 0
      display inline-block
      line-height 50px
      position relative
      vertical-align middle
      &>span:last-child
        position absolute
        top: 58%;
        left: 48%;
        font-size 12px
        color #DD001B
        transform translate(-50%,-50%)
      &>span.iconfont
        font-size 25px
        color #fff
      &>span.icon-paixingbang
        font-size 35px
.music-day-list
  margin-bottom 55px
  margin-top 5px
  clearFix()
  &>ul
    list-style none
    margin 0
    padding 0
    margin-left -10px
    &>li
      width 33.33%
      float left
      padding-left 10px
      box-sizing border-box
      padding-top 2px
      position relative
      border-radius:5px;
      &>img
        height 100px
        border-radius:5px;
      &>label
        width 100%
        text-align left
        height: 30px
        font-size 10px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        margin-bottom 2px
      &>span
        position absolute
        top 5px
        right 5px
        color #fff
        font-size 8px
</style>
