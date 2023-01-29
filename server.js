import express from 'express'
import mongoose from 'mongoose'
import { notFoundError, errorHandler } from './middlewares/error-handler.js'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

import { Server } from 'socket.io';


const app = express()
const port = process.env.PORT || 7001
const databaseName = 'AppBack'
const mongo_url =
    'mongodb+srv://appback:appback%40123@cluster0.va6izvj.mongodb.net/?retryWrites=true&w=majority'

//mongoose.set('debug', true);
mongoose.Promise = global.Promise

import reportRoute from './routes/report-route.js'

import userRoute from './routes/user-route.js'
import therapyRoutes from './routes/therapy-route.js'
import reservationRoutes from './routes/reservation-route.js'
import fcmRouter from './routes/fcm.js'
import rssRouter from './routes/rss_route.js'

//DATABASE
const hostname='localhost';


mongoose.set('debug', true)
mongoose.Promise = global.Promise


mongoose
    .connect(mongo_url)
    .then(() => {
        console.log('Connected to mongodb.')
    })
    .catch((error) => {
        console.log(error)
    })
/*mongoose
  .connect(`${mongo_url}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
*/
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: `http://${hostname}:${port}/`,
        methods: ['GET', 'POST'],
    },
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
io.on("connection",(socket)=>{
	console.log("socket connect");


  
  socket.on("send_chat",(msg)=>{
    console.log("message socket chat: ",msg)
    io.emit("receive_msg_send",msg)
  })




  socket.on("send_membre",(u)=>{
    console.log("membre groupe socket : ",u)
    io.emit("receive_membre",u)
  })


  socket.on("delete_membre",(u)=>{
    console.log("membre remove groupe socket : ",u)
    io.emit("remove_membre",u)
  })

 

  
  
	
	socket.on("disconnect",() => {
		console.log("User disconnect",socket.id);
	});
    
});


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
    console.log('middleware just run !')
    next()
})
app.use('/gse', (req, res, next) => {
    console.log('Middleware just ran on a gse route !')
    next()
})
app.use(express.urlencoded({ extended: true }))
app.use('/fcm', fcmRouter)
app.use('/rss', rssRouter)

app.use('/therapy', therapyRoutes)
app.use('/reservation', reservationRoutes)

app.use('/user', userRoute)
app.use('/report', reportRoute)

app.use('/image', express.static('public/images'))
app.use(notFoundError)
app.use(errorHandler)

server.listen(port,hostname, ()=>{
  console.log(`Server running at http://${hostname}:${port}/`);
})