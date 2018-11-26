export function checkEmail(email) {
    if(email.length === 0 ){
      return false
    }
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    return reg.test(email)
}

export function checkRequest(nameArg='', emailArg='', confirmEmailArg='') {
    let name = nameArg.trim();
    let email  = emailArg.trim().toLowerCase()
    let confirmEmail =  confirmEmailArg.trim().toLowerCase()
    if( name.length < 3 ) {
      return 1
    }
    if(!checkEmail(email)){
      return 2 
    }
    if(!checkEmail(confirmEmail)){
      return 3 
    }
    
    if( email !== confirmEmail) {
      return 4
    }

    return 0
}

export default {checkEmail, checkRequest}