import express from 'express';
import mongoose from 'mongoose';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import morgan from 'morgan';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 7001;
const databaseName = 'AppBack';

//mongoose.set('debug', true);
mongoose.Promise = global.Promise;

import reportRoute from './routes/report-route.js';

import userRoute from './routes/user-route.js';
import therapyRoutes from './routes/therapy-route.js'
import reservationRoutes from './routes/reservation-route.js'
import fcmRouter from './routes/fcm.js'
import rssRouter from './routes/rss_route.js'


//DATABASE
mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${databaseName}`))
  .catch(err => console.log(err) );


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());





app.use((req, res, next) => {
  console.log("middleware just run !");
  next();
});
app.use("/gse", (req, res, next) => {
  console.log("Middleware just ran on a gse route !");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use('/fcm', fcmRouter)
app.use('/rss', rssRouter)

app.use('/therapy', therapyRoutes);
app.use('/reservation', reservationRoutes);

app.use('/user', userRoute);
app.use('/report', reportRoute);

app.use('/image', express.static('public/images'));
app.use(notFoundError);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});