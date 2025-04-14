import mongoose from "mongoose";

const Schema = mongoose.Schema

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('task', taskSchema)