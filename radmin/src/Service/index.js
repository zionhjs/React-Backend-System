import axios from 'axios';

export default {
    userLogin(data) {
        return axios.post('/api/userlogin', data);   //post方法返回一个promise对象
    },
    loadUserList(params) {
        params = { ...params, ...{ _sort: 'id', _order: 'desc' } }
        return axios.get('/per/user', { params: params });
    },
    addUser(data) {
        return axios.post('/per/user', data);
    },
    deleteUser(ids) {
        return Promise.all(ids.map(id => {
            return axios.delete(`/per/user/${id}`);
        }));
    },
    updateUser(user){
        return axios.put(`/per/user/${user.id}`, user);
    },
    loadRoleList(params){
        return axios.get('/per/role', {...params});
    },
    deleteRoles(ids){
        return Promise.all(ids.map(id => axios.delete(`/per/role/${id}`)));
    },
    addRole(role){
        return axios.post('/per/role', role);
    }
}
