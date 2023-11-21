import { model, Schema } from "mongoose"

export const Task = model('Task', new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    assigned:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
        required: true,
    },
    dueDate:{
        type: String,
        required: true,
    },
  
    
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
