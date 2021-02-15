const request=require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGllbm1hbmgyOTQiLCJhIjoiY2trczlscjIxMGYzNDJ3b2l2aHhlY3ZnNiJ9.csWK44mGQCxA5ZQV29Y-_Q&limit=1'
    request({ url, json: true }, (error, {body}) => {
         if (error) {
              callback('Unabled to connect to location services',undefined)
         } else if (body.features.length == 0) {
              callback('Unabled to find location. Try another search',undefined)
         } else {
              callback(undefined,{
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
              })
         }
    })
}
module.exports=geocode