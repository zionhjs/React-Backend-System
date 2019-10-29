import axios from 'axios';

export default {
    userLogin(data){
        return axios.post('/api/userlogin', data);
    }
}

