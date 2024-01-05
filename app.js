require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();
// console.log(app)

const PORT = 5000 || env.process.PORT;

//conect to db
const connectDB = require('./server/config/db.js');
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);

app.set('layout','./layout/main');
app.set('view engine','ejs');

app.use('/', require('./server/routes/main.js'));


const url = 'http://localhost:5000/'

app.listen(PORT, () => {
    console.log(`Your connection is build on port ${PORT}....${url} `)
});