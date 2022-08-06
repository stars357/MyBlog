import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
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