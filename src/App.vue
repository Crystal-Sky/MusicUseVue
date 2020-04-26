<template>
  <div id="app">
    <router-view/>
    <bar v-show="$route.meta.showTabbar"></bar>
    <audio id='music' :src='flag?playingSongs[playingIndex].url.url:""'></audio>
  </div>
</template>

<script>
import bar from './components/bar'
import {getState} from './api/index'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'App',
  data: function () {
    return {
      flag: false
    }
  },
  components: {
    bar
  },
  methods: {
    ...mapActions({
      getUserInfo: 'getUserInfo'
    })
  },
  created () {
    if (localStorage.getItem('isLogin') === 'true') {
      getState().then(data => {
        this.getUserInfo(data.profile.userId)
      }, () => {})
    }
  },
  computed: {
    ...mapState({
      playingSongs: state => state.playingSongs,
      playingIndex: state => state.playingIndex
    })
  },
  watch: {
    playingIndex (value) {
      if (value > -1) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
html,body
  -webkit-text-size-adjust:none;
</style>
