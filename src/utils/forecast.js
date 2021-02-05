const request=require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=48e3d7078af924c3846e9db7ba7258bd&query='+lat+','+long
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to the weather service!',undefined)
        }
        else if(response.body.error){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.current.temperature)
        }
    })

}

module.exports=forecast