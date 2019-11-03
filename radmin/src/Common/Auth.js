import service from "../Service";

//当前登录用户的sessionStorage的key = const APP_LOGIN_USER...
const APP_LOGIN_USER = 'APP_LOGIN_USER';

/**
 * 校验当前用户是否已经登录
 * return{Boolean} 如果已经登录:true 否则返回false
 */
export function AuthLogin() {
    //sessionStorage 存储当前的登录信息
    let loginUserStr = sessionStorage.getItem(APP_LOGIN_USER);
    if(loginUserStr){
        return true
    }
    return false;
}

/**
 * 存储当前用户登录的信息到sessionStorage
 * @param {Objec} user 
 * @return undefined
 */
export function SaveLoginUserInfo(user){
    sessionStorage.setItem(APP_LOGIN_USER, JSON.stringify(user));
}

/**
 * 获取当前用户登录的信息到sessionStorage
 * @return {Object} user
 */
export function GetLoginUserInfo(user){
    let userStr = sessionStorage.getItem(APP_LOGIN_USER);
    if(userStr){
        return JSON.parse(userStr);
    }
    return null;
}

/**
 * 当前用户登出处理后续的相关信息
 * @return {Object} user
 */
export function Logout(){
    sessionStorage.clear();   //清空所有的用户登录的相关信息
}

/**
 * 保存用户登录后台的token信息
 * @param {String} token   请求身份
 */
export function saveLoginToken(token){
    sessionStorage.setItem('Authorization', token);
}

/**
 * 获取用户登录后台的token信息
 * @return {String} token   请求身份
 */
export function getLoginToken(token){
    return sessionStorage.getItem('Authorization', token);
}

/**
 * 获取当前登录用户的所有权限
 * @return {Promise} 对象内部返回当前登录用户的所有权限
 */
export function getLoginUserAllPer(){
    //拿到当前登录用户的id
    let userId = GetLoginUserInfo().id;
    //第一步 先从缓存中获取当前登录用户的所有权限 如果有直接返回
    let loginUserPerStr = sessionStorage.getItem('LOGIN_USER_PER');
    if(loginUserPerStr){
        return Promise.resolve(JSON.parse(loginUserPerStr));
    }
    //第二步 如果没有存在loginUserPerStr才发送ajax请求获取当前登录用户的所有权限并且在sessionStorage里面设置
    return service.loadUserAllPer(userId)
    .then(res => {
        sessionStorage.setItem('LOGIN_USER_PER', JSON.stringify(res.data));
        return res.data;
    })
}