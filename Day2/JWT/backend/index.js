const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;
const JWT_SECRET = 'your_jwt_secret'; 

app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect('mongodb+srv://sujith:9345793342S@cluster0.dquerwy.mongodb.net/')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Food Schema
const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysSinceIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Food = mongoose.model('Food', FoodSchema);



const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).send("A token is required for authentication");

    token = token.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userId = decoded.userId;
        next();
    });
};


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User Registered Successfully');
    } catch (error) {
        res.status(400).send('Registration Failed: Username may already exist');
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api/food', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;
        const food = new Food({ name, daysSinceIAte, user: req.userId });
        await food.save();
        res.status(201).send('Food item added');
    } catch (error) {
        res.status(500).send('Food item addition failed');
    }
});


app.get('/api/readfood', verifyToken, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).send('Failed to fetch food items');
    }
});

app.put('/api/updatefood/:id', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;
        await Food.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { name, daysSinceIAte }
        );
        res.status(200).send('Food item updated');
    } catch (error) {
        res.status(500).send('Food item update failed');
    }
});


app.delete('/api/deletefood/:id', verifyToken, async (req, res) => {
    try {
        await Food.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.status(200).send('Food item deleted');
    } catch (error) {
        res.status(500).send('Food item deletion failed');
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
}); 