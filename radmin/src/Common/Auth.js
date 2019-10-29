/**
 * 校验当前用户是否已经登录
 * return{Boolean} 如果已经登录:true 否则返回false
 */
export function AuthLogin() {
    //sessionStorage 存储当前的登录信息
    let loginUserStr = sessionStorage.getItem('APP_LOGIN_USER');
    if(loginUserStr){
        return true
    }
    return false;
}