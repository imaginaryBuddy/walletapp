
require('dotenv').config({path:__dirname+'/../../.env'})

const mongoose = require('mongoose/');
// mongoose.connect(`mongodb+srv://yapshenhwei:Haruka123@wallet-app.skhpn6r.mongodb.net/`);
const mongoDB = process.env.mongo_url
console.log("hello", mongoDB)
mongoose.connect(mongoDB)
const connection = mongoose.connection;

connection.once('error', ()=>{console.log('Error connecting to database')})
connection.once('open', ()=>{console.log('Mongo DB connected successfully')})

module.exports = connection;