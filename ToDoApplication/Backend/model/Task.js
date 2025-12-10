const mongoose=require('mongoose');
const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
});

const Task=mongoose.model('Task_data',TaskSchema);
module.exports=Task;