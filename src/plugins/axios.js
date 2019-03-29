import Vue from 'vue'
import axios from 'axios'

//  axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        Vue.prototype.$http.interceptors.response.use(res => {
            const array = []
            for(let i in res.data){
                array.push({ id: i, ...res.data[i]})
            }
            
            res.data = array
            return res
        }, error => Promise.reject(error))
    }
})