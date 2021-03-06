const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const mysql = require('mysql');
const db = require('./database')

const rateLimit = require('express-rate-limit');
/*
//constante à utiliser avec le package rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,       // = 15 minutes
  max: 5                          // 5 tentatives
});
*/
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const commentRoutes = require('./routes/comment')
const reportRoutes = require('./routes/report')

const app = express();



//configuration CORS
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(helmet());    //sécurise HTTP headers
/*app.use(limiter);*/

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/report', reportRoutes)

module.exports = app;