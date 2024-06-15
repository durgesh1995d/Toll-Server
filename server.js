const mysql = require('mysql') 
const express = require('express');
const winston = require('winston');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const connection = require('./Component/dbConnection')
const userData = require('./methodCall/getcall')
const VerificationToken = require('./Component/VerificationToken')

const app = express();
app.use(express.json())
 
app.get('/', userData.user);
app.post('/create',userData.register);

app.post('/login',userData.login);

app.post('/profile',VerificationToken,userData.profile)
     
app.get('/logout',VerificationToken,userData.logout)
    

app.listen(5000)
