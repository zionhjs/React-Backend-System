import axios from 'axios';

export default {
    userLogin(data){
        return axios.post('/api/userlogin', data);   //post方法返回一个promise对象
    },
    loadUserList(params){
        return axios.get('/per/user', {params: params})
    }
}

