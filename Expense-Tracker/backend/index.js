const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expensetracker');

const userSchema = new mongoose.Schema({ email: { type: String, unique: true }, password: String });
const User = mongoose.model('User', userSchema);
const Expense = mongoose.model('Expense', { description: String, amount: Number, date: Date });

app.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/expenses', async (req, res) => res.json(await Expense.find()));
app.post('/expenses', async (req, res) => res.json(await Expense.create(req.body)));
app.put('/expenses/:id', async (req, res) => res.json(await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/expenses/:id', async (req, res) => res.json(await Expense.findByIdAndDelete(req.params.id)));
app.listen(5000, () => console.log('Server running on port 5000'));