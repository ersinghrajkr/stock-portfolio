const mongoose = require('mongoose');

// Set up default mongoose connection
const mongodbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@singhrajkrmongod.pwoz6pq.mongodb.net/stock-portfolioDB?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('connected', function () {console.log('MongoDB Connected Successfully !')})
db.on("open", function () { console.log('Connection Open !') })
db.on("close", function () { console.log('Connection Close !') })
db.on('error', function (err) {console.log('MongoDB Connection Failed - ', err)})


// EXPORT CONNECTION
module.exports = mongoose