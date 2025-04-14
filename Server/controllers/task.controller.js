import taskModel from "../models/task.model.js"

export const createTask = async (req, res) => {
    const data = req.body
    try {
        const model = new taskModel(data)
        await model.save()
        res.status(201).json({message: "Task created.", success: true})
    } catch (error) {
        res.status(500).json({message: "Failed to create task.", success: false})
    }
}

export const getTasks = async (req, res) => {
    try {
        const data = await taskModel.find({})
        res.status(201).json({message: "Tasks fetched.", success: true, data})
    } catch (error) {
        res.status(500).json({message: "Failed to fetch tasks.", success: false})
    }
}

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const obj = {$set: {...body}}
        const data = await taskModel.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Tasks updated.", success: true, data})
    } catch (error) {
        res.status(500).json({message: "Failed to update tasks.", success: false})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        await taskModel.findByIdAndDelete(id)
        res.status(200).json({message: "Tasks deleted.", success: true})
    } catch (error) {
        res.status(500).json({message: "Failed to delete tasks.", success: false})
    }
}