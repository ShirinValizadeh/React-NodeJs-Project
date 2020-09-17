const express = require('express')
const session = require('express-session')
const fileupload = require('express-fileupload')
const fs = require('fs')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = process.env.PORT || 5000


app.use('/' , (req,res)=>{
    const html = fs.readFileSync(__dirname + '/index.html' , 'utf-8')
    res.send(html)
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});