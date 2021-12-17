const express = require('express');
const helmet = require('helmet');//combler les failles nodes et html.
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: process.cwd() + '/.env' });
//require('dotenv').config();

const sauce =require('./routes/sauce');
const user =require('./routes/user');

const app = express();
app.use(helmet());


mongoose.connect('mongodb+srv://NewUser01:openclassroom@cluster0.jfk47.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauce);
app.use('/api/auth', user);


module.exports = app;