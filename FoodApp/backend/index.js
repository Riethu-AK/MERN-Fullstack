const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const FoodModel = require('./Food')

const app = express();
const PORT = process.env.PORT || 3000

const mongoUrl = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodDB'
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error:', err && err.message ? err.message : err);
    });

app.use(cors());
app.use(express.json())

app.post("/insert", async (req,res) => {
    const foodName = req.body.foodName;
    const daySinceIate = req.body.daySinceIate;
    const food = new FoodModel({ foodName: foodName, daySinceIate: daySinceIate });
    try {
        await food.save();
        res.status(201).send("Food item inserted successfully");
    } catch (error) {
        res.status(500).send("Error inserting food item");
    }
});

app.get('/read', async (req,res) => {
    try {
        const fooditems = await FoodModel.find({});
        res.status(200).json(fooditems);
    } catch (error) {
        res.status(500).send("Error reading food items");
    }
});

app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const daySinceIate = req.body.daySinceIate;
    try {
        await FoodModel.findByIdAndUpdate(id, { daySinceIate: daySinceIate });
        res.status(200).send('Food item updated successfully');
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).send('Error updating food item');
    }
});

app.delete('/delete/:id', async (req,res) => {
    const id = req.params.id;
    try {
        await FoodModel.findByIdAndDelete(id);
        res.status(200).send("Food item deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting food item");
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    //console.log(`MongoDB Connection State: ${mongoose.connection.readyState === 1 ? ' Connected' : ' Disconnected'}`)
})

// Global handlers to surface errors that may cause the process to exit
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err)
})