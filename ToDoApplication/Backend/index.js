const TaskModel=require('./model/Task');
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());

try{
    mongoose.connect(process.env.MONGODB_URL);
}catch(err){
    console.log("Error in DB connection",err);
};

app.get('/',async(req,res)=>{
    res.send("Hello from ToDo Application Backend");
});

app.post('/addTask', async (req,res)=>{
    const {title, description, status}=req.body;
    const task=new TaskModel({
                    title: title,
                    description: description,
                    status: status
        });
    try{
        await task.save();
        res.status(200).send("Task added successfully");
    }catch(err){
        res.status(500).send("Error in adding the task: ",err)
    }
});

app.get('/readTask', async(req,res)=>{
    try{
        const Tasks=await TaskModel.find({});
        res.status(200).json(Tasks);
    }catch(err){
        res.status(500).send("Error in fetching the task ",err);
    }
});

app.put('/updateTask/:id',async (req,res)=>{
    const id=req.params.id;
    const newStatus=req.body.newStatus;
    try{
        TaskModel.findByIdAndUpdate(id,{status: newStatus},{new: true});
        res.status(200).send("Task updated successfully");
    }catch(err){
        res.status(500).send("Task updation failed..Try again");
    }
});

app.delete('/taskDelete/:id', async(req,res)=>{
    const id=req.params.id;
    try{
        TaskModel.findByIdAndDelete(id);
        res.status(200).send("The taks is deleted successfully");
    }catch(err){
        res.status(500).send("Task deletion failed");
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`The app is running on https://localhost:${process.env.PORT}`);
})