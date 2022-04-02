// All the validation functions goes here
exports.validatePassword = function(pass){
    if(pass.length > 5){
        return true;
    }
    return false;
}

exports.validatePhone = function(phone){
    if(phone.toString().length == 10){
        return true;
    }
    return false;
}

exports.validateName = function(name){
    if(name.length > 0){
        return true;
    }
    return false;
}