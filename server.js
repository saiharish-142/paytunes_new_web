const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGOURI } = require('./config/keys')
//const cron = require('node-cron')

app.use(express.json())
app.use(cors())

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 900000,
    socketTimeoutMS: 900000,
    useCreateIndex: true
}

mongoose.connect(MONGOURI,options)
mongoose.connection.on('connected',() => {
    console.log("connected to database.....")
})
mongoose.connection.on('error',err=>{
    console.log('error in connection',err)
})

const userrouter=require('./routes/user_routes')
app.use('/user',userrouter)





if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port, () => console.log(`app listening on port ${port}!`))

