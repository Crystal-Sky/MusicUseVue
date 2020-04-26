<template>
  <div class="play-container">
    <div :style="{backgroundImage:'url('+(flag?playingSongs[playingIndex].al.picUrl:defaultUrl)+')'}"></div>
    <div>
      <mt-header fixed :title="flag?(playingSongs[playingIndex].name + ' - ' + getAuthor(playingSongs[playingIndex].ar)):'未知'">
        <router-link to="" slot="left">
          <mt-button @click='back()' icon='back'></mt-button>
        </router-link>
        <span slot="right" class="iconfont icon-fenxiang"></span>
      </mt-header>
      <div class="play-middle">
        <div :class="{rotate:isPlayingState}">
          <img :src="flag?playingSongs[playingIndex].al.picUrl:defaultUrl">
        </div>
      </div>
      <div class="play-control">
        <div class="play-three iconfont">
          <div><div><span class="iconfont icon-like"></span></div></div>
          <div><div><span class="iconfont icon-ico_operation__download"></span></div></div>
          <div><div><span class="iconfont icon-pinglun"></span></div></div>
        </div>
        <div class="play-progress">
          <span>{{currentTime}}</span>
          <div id='progress' @mousedown="down()" @touchstart='down()' @mousemove.prevent="move()" @touchmove.prevent='move()' @mouseup='up()' @touchend='up()'><span :style="{'width':percent}"></span><em :style="{'left':percent}"></em></div>
          <span>{{duration}}</span>
        </div>
        <div class="control-button">
          <div><div><span @click='changeMode()' :class="['iconfont',currentMode[playMode]]"></span></div></div>
          <div><div><span @click='previous()' class="iconfont icon-shangyiqu101"></span></div></div>
          <div><div><span @click='playAndPause()' :class="{iconfont:true, 'icon-zanting': playing, 'icon-ziyuan': !playing }"></span></div></div>
          <div><div><span @click='next()' class="iconfont icon-xiayiqu101"></span></div></div>
          <div><div><span @click='isShowDetail=true' class="iconfont icon-bofangliebiao"></span></div></div>
        </div>
      </div>
      <div v-if='isShowDetail' class="playing-list">
        <div>当前播放<span>({{flag?playingSongs.length:'0'}})</span><span class="iconfont icon-web-icon-" @click='deleteAll()'></span></div>
        <ul>
          <li v-if='flag' v-for='(item,index) in playingSongs' :key='index' :class="{currentPlay: index === playingIndex}" @click='playThis(index)'>
            <span class="iconfont"><span>{{item.name}}</span> - <span class="ar">{{getAuthor(item.ar)}}</span></span>
            <span class="iconfont icon-baseline-close-px" @click.stop="deleteSongs(index)"></span>
          </li>
        </ul>
        <div @click='isShowDetail=false'>关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import none from '../../assets/none.jpg'
import {mapState, mapActions} from 'vuex'
export default {
  data: function () {
    return {
      flag: false,
      defaultUrl: none,
      audio: {},
      playing: true,
      duration: '00:00',
      currentTime: '00:00',
      timer: {},
      changeFlag: false,
      position: '',
      percent: '0%',
      moveWidth: '',
      currentPosition: 0,
      currentMode: ['icon-ttpodicon', 'icon-danquxunhuan', 'icon-liebiaoxunhuan', 'icon-suijibofang-wangyiicon'],
      isShowDetail: false
    }
  },
  beforeMount () {
    this.audio = document.getElementById('music')
    if (this.playingIndex > -1) {
      this.currentTime = this.getTimeString(this.audio.currentTime)
      this.duration = this.getTimeString(this.audio.duration)
    }
    if (this.isPlayingState) {
      this.timer = setInterval(this.showPlayingState, 1000)
    } else {
      if (this.audio.currentTime) {
        this.currentTime = this.getTimeString(this.audio.currentTime) === this.duration ? '00:00' : this.getTimeString(this.audio.currentTime)
        this.percent = (Number(this.audio.currentTime / this.audio.duration * 100).toFixed(2) + '%') === '100%' ? '0%' : (Number(this.audio.currentTime / this.audio.duration * 100).toFixed(2) + '%')
      }
      this.playing = false
    }
    let vueObject = this
    this.audio.oncanplay = function () {
      vueObject.duration = vueObject.getTimeString(this.duration)
      vueObject.setIsPlayingState(true)
      this.play()
    }
    this.audio.onended = function () {
      // 顺序播放，单曲循环，列表循环，随机播放
      switch (vueObject.playMode) {
        case 0:
          if (vueObject.playingIndex !== vueObject.playingSongs.length - 1) {
            vueObject.next()
          } else {
            clearInterval(vueObject.timer)
            vueObject.setIsPlayingState(false)
          }
          break
        case 1:
          this.play()
          break
        case 2:
        case 3:
          vueObject.next()
          break
        default:
          break
      }
      vueObject.percent = '0%'
      vueObject.currentTime = '00:00'
    }
    this.flag = true
    if (this.playingIndex === -1) {
      this.flag = false
    }
  },
  mounted () {
    if (this.playingIndex > -1) {
      this.percent = Number(this.audio.currentTime / this.audio.duration * 100).toFixed(2) + '%'
    }
  },
  watch: {
    isPlayingState (value) {
      if (value === true) {
        this.timer = setInterval(this.showPlayingState, 1000)
        this.playing = true
      } else {
        clearInterval(this.timer)
        this.playing = false
      }
    }
  },
  computed: {
    ...mapState({
      playingSongs: state => state.playingSongs,
      playingIndex: state => state.playingIndex,
      isPlayingState: state => state.isPlayingState,
      playMode: state => state.playMode
    })
  },
  methods: {
    deleteAll: function () {
      this.setPlayingIndex(-1)
      this.setIsPlayingState(false)
      this.flag = false
      this.emptyPlayingSongs()
    },
    deleteSongs: function (index) {
      this.delPlayingSons(index)
      if (index < this.playingIndex) {
        this.setPlayingIndex(this.playingIndex - 1)
      }
    },
    playThis: function (index) {
      this.setPlayingIndex(index)
      this.audio.load()
    },
    getAuthor: function (Authors) {
      if (Authors.length > 0) {
        let author = Authors[0].name
        for (let i = 1; i < Authors.length; i++) {
          author += '/' + Authors[i].name
        }
        return author
      }
      return ''
    },
    back: function () {
      clearInterval(this.timer)
      this.$router.go(-1)
    },
    showPlayingState: function () {
      this.currentTime = this.getTimeString(this.audio.currentTime)
      this.percent = Number(this.audio.currentTime / this.audio.duration * 100).toFixed(2) + '%'
    },
    changeMode: function () {
      let mode = this.playMode + 1
      if (mode > 3) {
        mode = 0
      }
      this.setPlayMode(mode)
    },
    previous: function () {
      var index = 1
      if (this.playMode === 3) {
        index = this.playingIndex - Math.floor(Math.random() * (this.playingSongs.length - 1) + 1)
      } else {
        index = this.playingIndex - index
      }
      if (index < 0) {
        index = index + this.playingSongs.length
      }
      this.setPlayingIndex(index)
      this.audio.load()
    },
    next: function () {
      var index = 1
      if (this.playMode === 3) {
        index = this.playingIndex + Math.floor(Math.random() * (this.playingSongs.length - 1) + 1)
      } else {
        index = this.playingIndex + index
      }
      if (index >= this.playingSongs.length) {
        index = index - this.playingSongs.length
      }
      this.setPlayingIndex(index)
      this.audio.load()
    },
    playAndPause: function () {
      this.playing = !this.playing
      if (this.audio.paused) {
        this.audio.play()
        this.setIsPlayingState(true)
      } else {
        this.audio.pause()
        clearInterval(this.timer)
        this.setIsPlayingState(false)
      }
    },
    down: function () {
      this.changeFlag = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.currentPosition = parseFloat(this.percent.slice(0, -1))
      this.position = touch.clientX
    },
    move: function () {
      if (this.changeFlag) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        let moveX = touch.clientX - this.position
        let width = document.getElementById('progress').offsetWidth
        let change = parseFloat(Number(moveX / width * 100).toFixed(2))
        width = this.currentPosition + change
        if (width < 0) {
          width = 0
        }
        if (width > 100) {
          width = 100
        }
        this.percent = width + '%'
        this.moveWidth = width
        // document.addEventListener('touchmove', function () {
        //   event.preventDefault()
        // }, false)
      }
    },
    up: function () {
      this.audio.currentTime = this.audio.duration * this.moveWidth / 100
      this.currentTime = this.getTimeString(this.audio.currentTime)
      this.percent = this.moveWidth + '%'
      this.changeFlag = false
    },
    getTimeString: function (time) {
      let m = Math.floor(time / 60)
      let s = Math.floor(time % 60)
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return m + ':' + s
    },
    ...mapActions({
      setIsPlayingState: 'setIsPlayingState',
      setPlayingIndex: 'setPlayingIndex',
      setPlayMode: 'setPlayMode',
      delPlayingSons: 'delPlayingSons',
      emptyPlayingSongs: 'emptyPlayingSongs'
    })
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins'
.play-container
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  overflow hidden
  &>div:first-of-type
    filter blur(20px)
    height 100%
    background-size cover
    transform scale(1.2)
  &>div:last-of-type
    position absolute
    top 0px
    left 0px
    height 100%
    width 100%
    overflow-y auto
    &>div.play-middle
      height 100%
      display flex
      align-items center
      justify-content center
      &>div
        width 250px
        height 250px
        padding 30px
        border-radius 50%
        background-color #000
        border 15px solid #eaeaea
        box-sizing border-box
        &>img
          width 160px
          height 160px
          border-radius 50%
    &>div.play-control
      position fixed
      bottom 0
      left 0
      height 120px
      width 100%
      &>div.play-three
        display flex
        margin-top 10px
        margin-bottom 10px
        &:after
          content "\e6d3"
          font-size 25px
          color #fff
          margin-right 10px
        &>div
          flex 1
          text-align center
          color #fff
          font-size 25px
      &>div.play-progress
        width 100%
        height 20px
        display flex
        align-items center
        &>div
          flex 1
          width 100%
          height 2px
          position relative
          background-color #fff
          &>span
            width 0%
            height 2px
            position absolute
            top 0
            left 0
            background-color #d8d8d8
            display inline-block
          &>em
            display inline-block
            width 4px
            height 4px
            border-radius 50%
            position absolute
            top 50%
            transform translateY(-50%)
            left 0%
            margin-left -1px
            background-color #898989
        &>span
          margin-right 8px
          margin-left 8px
          font-size 14px
          color #fff
          width 38px
      &>div.control-button
        display flex
        &>div
          flex 1
          text-align center
          color #fff
          font-size 25px
          .icon-ziyuan
            font-size 35px
          .icon-zanting
            font-size 35px
    &>div.playing-list
      width 94%
      height 60%
      position absolute
      background-color #fff
      bottom 10px
      left 0
      right 0
      margin 0 auto
      border-radius 10px
      &>div:first-of-type
        height 10%
        display flex
        padding-left 8px
        padding-right 8px
        align-items center
        font-size 18px
        &>span:first-of-type
          font-size 14px
          color #989898
          flex 1
        &>span:last-of-type
          font-size 20px
          color #989898
      &>div:last-of-type
        height 10%
        display flex
        font-size 18px
        align-items center
        justify-content center
      &>ul
        height 80%
        margin 0
        padding-top 0
        padding-bottom 0
        padding-right 12px
        padding-left 12px
        list-style none
        overflow-y auto
        &>li
          font-size 16px
          height 40px
          display flex
          align-items center
          border-bottom 1px solid #e2e2e2
          &.currentPlay
            color red
            &>span:first-of-type
              &:before
                content "\e6c4"
                margin-right 5px
              &>span.ar
                color red
          &>span:first-of-type
            flex 1
            &>span:last-of-type
              color #686868
          &>span.icon-baseline-close-px
            color #989898
.mint-header
  color #fff
  font-size 18px
  background transparent
.rotate{
  animation: play 25s linear infinite;
}
@keyframes play{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
