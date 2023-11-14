import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/reg",[
    check("email", "інвалід email").isEmail(),
    check("password", "Невірний пароль").isLength({min: 4})
], 


    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
            errors: errors.array(),
            message: "невірні дані при реєстрації"
        })
        }
        const {email, password} = req.body
        const isUsed = await User.findOne({email})
        
        if (isUsed) {
            return res.status(300).json({message: "Данний емеіл вже зайнятий спробуйте інший"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()
        const jwtSecret = "my_secret_key"
        const token = jwt.sign({userId: user.id,},
            jwtSecret,
            {
                expiresIn: "1h"
            }
        )
        res.status(200).json({token, userId: user.id, message:"successfully signed"})
        
    } catch (error) {
        console.log("auth.route.js post('/reg')",error);
    }
}) 


router.post("/login",
[
    check("email", "інвалід email").isEmail(),
    check("password", "Невірний пароль").exists(),
], 

    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
            errors: errors.array(),
            message: "невірні дані при реєстрації"
        })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "такий Email не зареєстрований"})
        const isMatch =  bcrypt.compareSync(password, user.password)
        if(!isMatch) return res.status(400).json({message: "невірний пароль"})
        const jwtSecret = "my_secret_key"
        const token = jwt.sign({userId: user.id,},
            jwtSecret,
            {
                expiresIn: "2h"
            }
        )
        res.status(200).json({token, userId: user.id, message:"successfully signed"})
        
    } catch (error) {
        console.log("auth.route.js post('/loin')",error);
    }
}) 

export default router