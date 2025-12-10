const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; 
require('dotenv').config(); 
require('./db');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true,unique:true},
  age: { type: Number, required: true}
});
const User = mongoose.model('User', userSchema);

const newUser = new User({
  username: 'Sujith',
  email: 'sujith@gmail.com',
  age: 19
});
newUser.save().then(() => {
  console.log('User saved successfully');
}).catch((err) => {
  console.error('Error saving user:', err); 
});

app.get('/users/:userid/profile', (req, res) => {
  const userId = req.params.userid;
  const name = req.query.name;
  const age = req.query.age;
  res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
});
 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});