import axios from 'axios'
import router from '../router/index.js'

axios.defaults.baseURL = 'https://sdaapi.glabazna.eu/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}


export default {
  get (path) {
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.log(error.response.status)
      let msg = error.response.status === 404
        ? 'the record has not been found'
        : 'something went wrong'
      store.commit('setErrorMsg', msg)
      router.push('/error')
    })
  },



  post (path, body) {
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      store.commit('setErrorMsg', 'some error happened when saving record')
      router.push('/error')
    })
  },
  put (path, body) {
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      store.commit('setErrorMsg', 'some error happened when editing record')
      router.push('/error')
    })
  },
  delete (path, body) {
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      store.commit('setErrorMsg', 'some error happened when deleting record')
      router.push('/error')
    })
  }

}