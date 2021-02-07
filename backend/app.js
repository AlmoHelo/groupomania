const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const mysql = require('mysql');

const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
/*
//constante à utiliser avec le package rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,       // = 15 minutes
  max: 5                          // 5 tentatives
});
*/
const userRoutes = require('./routes/user');

const app = express();

const db = mysql.createConnection({ 
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE 
});

db.connect(function(err) {

  if (err) throw err;

  console.log("Connecté à la base de données MySQL!");

});

//configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());



app.use(helmet());    //sécurise HTTP headers
/*app.use(limiter);*/
app.use(mongoSanitize());

// Routes
app.use('/api/auth', userRoutes);

module.exports = app;