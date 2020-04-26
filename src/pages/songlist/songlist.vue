<template>
  <div class="list-container">
    <div :style="{backgroundImage:'url('+(flag?playlist.coverImgUrl:defaultUrl)+')'}"></div>
    <div>
      <mt-header fixed title="歌单">
        <span @click='$router.go(-1)' slot="left">
          <mt-button icon='back'></mt-button>
        </span>
        <span slot="right" @click="$router.push('/play')">
          <span class="one"></span>
          <i :class="{black:true, play:isPlayingState}" v-for="i in 4" :key="i"></i>
        </span>
      </mt-header>
      <div class="list-about">
        <div class="listLeft">
          <img class="listPic" :src='flag?playlist.coverImgUrl:defaultUrl'>
          <span class="iconfont icon-bofang">{{flag?getPlayCount(playlist.playCount):0}}</span>
        </div>
        <div class="listRight">
            <p>{{flag?playlist.name:''}}</p>
            <div>
              <img :src="flag?playlist.creator.avatarUrl:defaultUrl">
              <span class="iconfont">{{flag?playlist.creator.nickname:''}}</span>
            </div>
            <p class="iconfont"><span>{{flag?playlist.description:'暂无简介'}}</span></p>
        </div>
      </div>
      <div class="four">
        <div><div><span class="iconfont icon-pinglun"></span><div>{{flag?playlist.commentCount:'评论'}}</div></div></div>
        <div><div><span class="iconfont icon-fenxiang"></span><div>{{flag?playlist.shareCount:'分享'}}</div></div></div>
        <div><div><span class="iconfont icon-ico_operation__download"></span><div>下载</div></div></div>
        <div><div><span class="iconfont icon-duoxuan"></span><div>多选</div></div></div>
      </div>
      <div class="song-list">
        <div>
          <span class="iconfont icon-ziyuan" @click="playAll()">播放全部<span>(共{{flag?playlist.trackCount:0}}首)</span></span>
          <span class="iconfont icon-add">收藏({{flag?playlist.subscribedCount:''}})</span>
        </div>
        <div class="loading" v-if="!flag">
          <img :src="loading">
        </div>
        <ul v-if="flag">
          <li v-for='(item,index) in playlistSongs' :key='index' @click='play(item)'>
            <em>{{index+1}}</em>
            <div>
                <div>{{item.name}}</div>
                <div>
                  <!-- <span class="dj">独家</span><span class="sq">SQ</span> -->
                  <span>{{getAuthor(item.ar)}}{{item.al.name}}</span>
                </div>
            </div>
            <span v-show='item.mv===0?false:true' class="iconfont icon-shipin"></span>
            <span class="iconfont icon-gengduo"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getPlaylistDetail, getSongDetail, checkMusicCanplay, getMusicUrl} from '../../api/index'
import {MessageBox} from 'mint-ui'
import {mapState, mapActions} from 'vuex'
import none from '../../assets/none.jpg'
import loading from '../../assets/loading.gif'
export default {
  data: function () {
    return {
      flag: false,
      defaultUrl: none,
      ids: '',
      songsIds: [],
      musicUrls: [],
      loading: loading
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
    getAuthor: function (Authors) {
      if (Authors.length > 0) {
        let author = Authors[0].name
        for (let i = 1; i < Authors.length; i++) {
          author += '/' + Authors[i].name
        }
        author += ' - '
        return author
      }
      return ''
    },
    play: function (item) {
      checkMusicCanplay(item.id).then((data) => {
        getMusicUrl(item.id).then((data) => {
          item.url = data.data[0]
          if (item.url.url === null) {
            MessageBox('提示', '抱歉，暂无法播放')
          } else {
            this.emptyPlayingSongs()
            this.setPlayingSongs(item)
            this.setPlayingIndex(0)
            this.$router.push('/play')
          }
        }, () => {})
      }, () => {
        MessageBox('提示', '亲爱的，暂无版权')
      })
    },
    playAll: function () {
      this.emptyPlayingSongs()
      this.setPlayingIndex(0)
      let items = this.playlistSongs
      for (var i = 0; i < items.length; i++) {
        if (this.musicUrls[i].url !== null) {
          items[i].url = this.musicUrls[i]
          this.setPlayingSongs(items[i])
        }
      }
      this.$router.push('/play')
    },
    ...mapActions({
      setPlaylist: 'setPlaylist',
      setPlaylistSongs: 'setPlaylistSongs',
      setPlayingSongs: 'setPlayingSongs',
      setPlayingIndex: 'setPlayingIndex',
      emptyPlayingSongs: 'emptyPlayingSongs'
    })
  },
  created () {
    getPlaylistDetail(this.$route.params.id).then((data) => {
      var trackIds = data.playlist.trackIds
      var songsUrl = ''
      for (let i = 0; i < trackIds.length; i++) {
        this.songsIds.push(trackIds[i].id)
        songsUrl += trackIds[i].id + ','
      }
      songsUrl = songsUrl.substring(0, songsUrl.length - 1)
      this.ids = songsUrl
      getSongDetail(songsUrl).then((data) => {
        this.setPlaylistSongs(data.songs)
      }, () => {})
      getMusicUrl(songsUrl).then((data) => {
      }, () => {})
      this.setPlaylist(data.playlist)
      this.flag = true
    }, () => {})
  },
  watch: {
    playlistSongs (value) {
      for (var i = 0; i < this.songsIds.length; i++) {
        getMusicUrl(this.songsIds[i]).then((data) => {
          this.musicUrls.push(data.data[0])
        }, () => {})
      }
    }

  },
  computed: {
    ...mapState({
      playlist: state => state.playlist,
      playlistSongs: state => state.playlistSongs,
      isPlayingState: state => state.isPlayingState
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.mint-msgbox
  border-radius 15px
.mint-msgbox-confirm
  color #DD001B
  font-size 16px
  &:active
    color #DD001B
</style>
<style lang='stylus' rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins'
.loading
  &>img
    width 100%
    height 200px
    margin 0 auto
.list-container
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
    top 50px
    left 0px
    height 100%
    width 100%
    overflow-y auto
.list-about
  display flex
  padding-top 20px
  padding-bottom 20px
.listLeft
  position relative
  margin-left 8px
  margin-right 20px
  width 120px
  height 120px
  &>span
    position absolute
    top 5px
    right 5px
    color #fff
    font-size 10px
.listRight
  color #fff
  flex 1
  margin-right 8px
  &>div
    font-size 12px
    padding 2px 0
    &>span
      vertical-align middle
      &:after
        content "\e605"
  img
    width 40px
    height 40px
    border-radius 50%
    vertical-align middle
    margin-right 10px
  &>p
    margin 3px 0
    padding 0
    &:first-of-type
      font-size 18px
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
    &:last-of-type
      display flex
      &>span
        font-size 12px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 1
        -webkit-box-orient vertical
      &:after
        margin-left -1px
        content "\e605"
.listPic
  width 120px
  height 120px
  border-radius 5px
.four
  display flex
  margin-top 10px
  margin-bottom 10px
  &>div
    flex 1
    text-align center
    font-size 12px
    color #fff
    .iconfont
      color #fff
      font-size 35px
.song-list
  background-color #fff
  width auto
  position: absolute;
  top: 235px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  &>div
    margin 10px 8px
    clearFix()
    &>span.icon-ziyuan
      height 35px
      line-height 35px
      &:before
        margin-right 10px
        font-size 30px
        vertical-align top
      &>span
        opacity 0.6
    &>span.icon-add
      float right
      width 120px
      height 35px
      line-height 35px
      border-radius 35px
      color #fff
      background: linear-gradient(to right,rgba(255,0,0,0.5),rgba(255,0,0,0.8),rgba(255,0,0,1));
      text-align center
      &:before
        margin-right 5px
  &>ul
    list-style none
    margin 0
    padding 0 8px 110px
    background-color #fff
    &>li
      display flex
      align-items center
      padding-bottom 10px
      &>em
        display inline-block
        font-style normal
        opacity 0.5
        margin-right 10px
      &>span
        opacity 0.5
        &:first-of-type
          margin-right 15px
      &>div
        flex 1
        margin-right 15px
        &>div:first-of-type
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          -webkit-box-orient vertical
        &>div:last-of-type
          display flex
          &>span.dj
          &>span.sq
            font-size 6px
            border 1px solid red
            padding-left 2px
            padding-right 2px
            color red
            border-radius 3px
            margin 2px
            white-space nowrap
          &>span:last-of-type
            font-size 10px
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
            line-height 14px
            opacity 0.5
.one
  display inline-block
  height 20px
.black
  display inline-block
  width 2px
  background-color #fff
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
  color #fff
  font-size 18px
  background transparent
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
