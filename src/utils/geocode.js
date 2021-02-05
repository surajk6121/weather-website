const request= require('request')

const geocode = (address,callback)=>{

    const geocodeurl= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VyYWprNjEyMSIsImEiOiJja2l3emcxbXozYWNvMnFwMzZlbHcyd2g3In0.RHS2uaQE9SBBEwUd4pfzqg&limit=1'
    request({url:geocodeurl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(response.body.features.length==0){
            callback('Unable to find location. Please try another search.',undefined)
        }
        else{
        
            const location = {
                lat: response.body.features[0].geometry.coordinates[1],
                long: response.body.features[0].geometry.coordinates[0],
                place: response.body.features[0].place_name
            }
            callback(undefined,location)
        }
    })

}

module.exports= geocode