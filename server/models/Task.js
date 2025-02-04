import mongoose from "mongoose";

const schema = mongoose.Schema;

const taskSchema = new schema({ 
    title: {
        type: String,
        required: true,
        trim: true 
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      dueDate: {
        type: Date,
        default: null
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      user_id: {
        type: String,
        required: true
      }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;