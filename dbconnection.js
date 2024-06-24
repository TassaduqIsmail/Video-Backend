const mongoose = require('mongoose');
require('dotenv').config()


function dbconnection() {

  // const MONGODB_URI = process.env.MONGODB_URI;
  // console.log('check',MONGODB_URI)

  mongoose.connect('mongodb+srv://annajessica272:annajessica@vinedeo.2nj2hyd.mongodb.net/Vinedeo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

}


module.exports = dbconnection;
