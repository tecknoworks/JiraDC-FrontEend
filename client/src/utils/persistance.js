var loggedUser = null
var moment = require('moment')

export function getLoggedUser() {
    if (loggedUser != null) {
        return loggedUser
    }
    
    const userData = localStorage.getItem("userData")
    var obj = JSON.parse(userData)
    if(userData!=null){
        var nowDate=new Date()
        var utcNowDate=moment.utc( nowDate ).format()
        var dataObject=moment(utcNowDate)
        var duration = moment.duration(dataObject.diff(obj.time));
        console.log(duration.hours())
        if(duration.hours()<25){
            loggedUser = {
                isAuthUser: true,
                token: userData
            }

        }else{
            loggedUser = {
                isAuthUser: false
            }
        }
    }else{
        loggedUser = {
            isAuthUser: false 
        }
    }
    return loggedUser;
}