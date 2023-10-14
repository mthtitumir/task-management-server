const express = require("express");
const userRouter = express.Router();
const app = express();


userRouter.get('/',(req,res)=>{
    res.send("vai coltese")
})
userRouter.get('/1',(req,res)=>{
    const id = req.params.id;
    res.send(`vai coltese ${id}`)
})

module.exports = userRouter;