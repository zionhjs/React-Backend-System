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
 * 存储当前用户登录的信息到本地存储
 * @param {Objec} user 
 * @return undefined
 */
export function SaveLoginUserInfo(user){
    sessionStorage.setItem(APP_LOGIN_USER, JSON.stringify(user));
}
