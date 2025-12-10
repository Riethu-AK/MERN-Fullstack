const mongoose = require('mongoose')

const uri = 'mongodb_link'
mongoose.connect(uri)
const connection = mongoose.connection

connection.once('open', () => {
console.log("MongoDB connected successfully!");
});
