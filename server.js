const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const publicVapidKey = 'BBAj18v4Nr8XVy_N0qdQSE1Fb_wdkK2lej3Xbej1cwrhuM64jlhODmZ3XanYoajXzASLKlH1nzNdVMjtpanXT60'
const privateVapidKey = '5DO8vmEH6fa8erjDTCiTU2Y3BkzhgdSbhfdozOqnjfM'

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)


const app = express()
const http = require('http').createServer(app)


// Subscribe Route

// Express App Config
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    app.use(express.static(path.resolve(__dirname, 'public')))
    // const corsOptions = {
    //     origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    //     credentials: true
    // }
    // app.use(bodyParser.json())
    // app.use(cors(corsOptions))
}

app.post('/subscribe', (req, res) => {
    const subsciption = req.body
    res.status(201).json({title: 'Push Test'})
    const payload = JSON.stringify({ title: 'Push Test' })
    webpush.sendNotification(subsciption, payload).catch(err => console.error(err))
})
    // Make every server-side-route to match the index.html
    // so when requesting http://localhost:3030/index.html/car/123 it will still respond with
    // our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
    app.get('/**', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })


    const port = process.env.PORT || 3030
    http.listen(port,()=>{console.log(`Server is running on port ${port}`)})