import { Task } from "../../models/index.js"

class taskController {

    index = async(req,res,next)=>{
        try{
            const task = await Task.find()
            res.json(task)
        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }
    
    store = async(req,res,next)=>{
        try{
            const {title,description,assigned,status,dueDate} = req.body

            await Task.create({title,description,assigned,status,dueDate})
            
            res.status(201).json({
                success:'Task created successfully'
            })
            

        }catch(e){
            console.error(e)
            next({message: 'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const task = await Task.findById(req.params.id)
            res.json(task)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    update = async(req,res,next)=>{
        try{
            const {title,description,assigned,status,dueDate} = req.body
            await Task.findByIdAndUpdate(req.params.id,{title,description,assigned,status,dueDate})
            res.json({
                success:'Task updated'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }

    destroy = async(req,res,next)=>{
        try{
            await Task.findByIdAndDelete(req.params.id)
            res.json({
                success:'Task removed'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }
}

export default new taskController
