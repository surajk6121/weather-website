const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

//Define path for express config
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDir= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Suraj Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Suraj Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Suraj Kumar'
    })
})




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.lat,data.long,data.place,(error,data)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                
                location: data.place,
                forecast: data.temp,
                feelslike: data.feel,
                Humidity: data.humidity

            })
        })
    })
})

app.get('/products', (req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title:'Help Page Article',
        name : 'Suraj',
        errrorMessage : 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('genError',{
        title: '404 Page',
        name: 'Suraj',
        errrorMessage: 'Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is running on port '+port)
})