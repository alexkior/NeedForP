require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');


app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(
  session({
    name: 'sId',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'slksvj',
    resave: false,
  })
)

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('Server start on port', PORT);
});
