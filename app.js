require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');
// console.log(app)

const PORT = 5000 || env.process.PORT;

//conect to db
const connectDB = require('./server/config/db.js');
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(cookieParser());

// Use middleware for session management with MongoDB store
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);

app.set('layout','./layout/main');
app.set('view engine','ejs');

app.use('/', require('./server/routes/main.js'));
app.use('/', require('./server/routes/admin.js'));
// app.use('/', require('./server/routes/contact.js'));
app.use('/', require('./server/routes/contact.js'));




const url = 'http://localhost:5000/'

app.listen(PORT, () => {
    console.log(`Your connection is build on port ${PORT}....${url} `)
});