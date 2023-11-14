import { Router } from "express";
import Todo from "../models/Todo.js";
import mongoose from "mongoose";
const router = Router();

router.post("/add", async (req, res)=> {
    try {
        const {text, userId} = req.body;

        const todo = await new Todo({
            owner: userId,
            text,
            completed: false,
            important: false
        })
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error("todo.router.js", error);
    }
})


router.get("/", async (req, res)=> {
    try {
        const {text, userId} = req.query;

        const todo = await Todo.find({ owner: userId})

        res.json(todo);
    } catch (error) {
        console.log("todo.router.js",error);
    }
})


router.delete("/delete/:id", async (req, res)=> {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ObjectId" });
        }
        const todo = await Todo.findOneAndDelete({_id: req.params.id})
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json(todo)

    } catch (error) {
        console.log("todo.router.js delete",error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.put('/completed/:id', async (req, res)=> {
    try {
        const todo = await Todo.findByIdAndUpdate({_id: req.params.id})
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo)
    } catch (error) {
        console.log("todo.router.js put",error);
    }
})
router.put('/important/:id', async (req, res)=> {
    try {
        const todo = await Todo.findByIdAndUpdate({_id: req.params.id})
        todo.important = !todo.important;
        await todo.save();
        res.json(todo)
    } catch (error) {
        console.log("todo.router.js put",error);
    }
})


export default router
