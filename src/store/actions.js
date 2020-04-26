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
import {
  getInfo
} from '../api'

export default {
  delPlayingSons ({commit}, index) {
    commit(DEL_PLAYINGSONGS, index)
  },
  setUserInfo ({commit}, userInfo) {
    commit(SET_USER_INFO, {userInfo})
  },
  async getUserInfo ({commit}, uid) {
    const result = await getInfo(uid)
    if (result.code === 200) {
      commit(SET_USER_INFO, {userInfo: result.profile})
    }
  },
  setPlaylist ({commit}, playlist) {
    commit(SET_PLAYLIST, {playlist})
  },
  setPlaylistSongs ({commit}, playlistSongs) {
    commit(SET_PLAYLISTSONGS, {playlistSongs})
  },
  emptyPlayingSongs ({commit}) {
    commit(EMPTY_PLAYINGSONGS)
  },
  setPlayingSongs ({commit}, playingSongs) {
    commit(SET_PLAYINGSONGS, [playingSongs])
  },
  setPlayingIndex ({commit}, playingIndex) {
    commit(SET_PLAYINGINDEX, playingIndex)
  },
  setIsPlayingState ({commit}, isPlayingState) {
    commit(SET_ISPLAYINGSTATE, isPlayingState)
  },
  setPlayMode ({commit}, playMode) {
    commit(SET_PLAYMODE, playMode)
  }
}
