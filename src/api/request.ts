import axios from 'axios'

const request = axios.create({
    baseURL: 'http://47.103.192.156:8000',
    timeout: 5000,
})

// request.interceptors.request.use((c) => {
//     const token = sessionStorage.getItem('blog-token');
//     if(token){
//         c.headers = {
//             ...c.headers,
//             'token': token
//         }
//     }
//     return c;
// })

export default request