import {
  SET_USER_INFO,
  SET_PLAYLIST,
  SET_PLAYLISTSONGS,
  EMPTY_PLAYINGSONGS,
  SET_PLAYINGSONGS,
  SET_PLAYINGINDEX,
  SET_ISPLAYINGSTATE,
  SET_PLAYMODE,
  DEL_PLAYINGSONGS
} from './mutation-type'

export default {
  [DEL_PLAYINGSONGS] (state, index) {
    state.playingSongs.splice(index, 1)
  },
  [SET_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [SET_PLAYLIST] (state, {playlist}) {
    state.playlist = playlist
  },
  [SET_PLAYLISTSONGS] (state, {playlistSongs}) {
    state.playlistSongs = playlistSongs
  },
  [EMPTY_PLAYINGSONGS] (state) {
    state.playingSongs = []
  },
  [SET_PLAYINGSONGS] (state, [playingSongs]) {
    state.playingSongs.push(playingSongs)
  },
  [SET_PLAYINGINDEX] (state, playingIndex) {
    state.playingIndex = playingIndex
  },
  [SET_ISPLAYINGSTATE] (state, isPlayingState) {
    state.isPlayingState = isPlayingState
  },
  [SET_PLAYMODE] (state, playMode) {
    state.playMode = playMode
  }
}
