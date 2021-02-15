const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define path for the Express config

const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Tien Manh'

    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
       title:'About this Web',
       name:'Tien Manh'
   })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Find help here!',
        title:'Help',
        name:'Tien Manh'
    })
 })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address!'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
             if(error){
                 return  res.send({error})
             }
             forecast(latitude, longitude, (error, forecastData) => {
                  if(error){
                       return res.send({error})
                  }
                  res.send({
                      forecast: forecastData,
                      location,
                      address: req.query.address
                  })
             })
        })
   }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Tien Manh',
        title:'404',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'Tien Manh',
        title:'404',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port'+port)
})