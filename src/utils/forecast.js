const request=require('request')

const forecast= (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=76942cff1f9aff4d615464990ad2ba01&query='+latitude+','+longitude
    request({url, json: true }, (error, {body}) => {
         if (error) {
              callback('Unabled to connect to weather api',undefined)
         } else if (body.error) {
              callback('Unabled to find location. Try another search',undefined)
         } else {
              const day=''
              if(body.current.is_day=='no'){
                   day='night'
              }
              else{
                   day='day'
              }
              callback(undefined,body.current.weather_descriptions[0]+': It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.\n'
              +'Wind speed is '+body.current.wind_speed+'. Cloud cover about '+body.current.cloudcover+'. Current is'+day)
         }
    })
}
module.exports=forecast