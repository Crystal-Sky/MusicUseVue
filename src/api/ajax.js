import axios from 'axios'
export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let request
    if (type === 'GET') {
      let dataUrl = ''
      Object.keys(data).forEach(key => {
        dataUrl += key + '=' + data[key] + '&'
      })
      if (dataUrl !== '') {
        url += '?' + dataUrl.substring(0, dataUrl.lastIndexOf('&'))
      }
      request = axios.get(url)
    } else {
      request = axios.post(url, data)
    }
    request.then(response => resolve(response.data)).catch(error => reject(error))
  })
}
