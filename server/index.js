// same as const express=require('express')
import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import cors from 'cors';
import mongoose from 'mongoose';
import { addUser,registerUser,getUsers,UserLogin } from "./Controllers/user.js";
import { addtoCart,getCart } from './Controllers/cart.js'
import { addItem,getitems,deleteItem,updateItem } from "./Controllers/pizza.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import session from "express-session";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import User from './Model/user.js'
dotenv.config()

const app=express();
app.use(express.json());
app.use(cors({
    // origin : ("http://localhost:3000/"),
    // methods : ("GET","POST"),
    // credentials : true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(session({
    key : "userID",
    secret : "subscribe",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expire: 60*60*24
    }
}))



const PORT= process.env.PORT || 5000;


mongoose.connect("mongodb://localhost:27017/SDP_Project",{

    useNewUrlParser: true

},()=>{
    console.log("Database Connected")
})

app.listen(PORT,()=>{
    console.log("Server Running at : "+PORT);
})








// Routes
app.post("/login",(req,res)=>{
    // console.log(req.body)
    const {email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(user)
        {
            bcrypt.compare(password, user.password,(err,data)=>{
                if(err)
                {
                    console.log(err.message);
                    res.send("Enter Password Again")
                }
                else{
                    req.session.views = user
                    // console.log(req.session.user)
                    if(email === "shrutimak810@gmail.com")
                    {
                        console.log("Admin logged in")
                        res.send({message:"Admin Login" ,user:user})
                        return
                    }
                    else{
                        console.log("Login Successfully");
                        res.send({message : "Customer Login",user:user})
                    }
                }
            })
        }
        else{
            console.log(err.message);
            res.send({message:"User does not exist"});
        }
    })
})
app.get('/login',(req,res)=>{
    if(req.session.views){
       res.send({loggedin : true},req.session.user)
    }
    else{
        res.send({loggedin : false})
    }
})
app.post("/register",registerUser)





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/src/image');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


app.post('/additems',upload.single('image'),addItem)

app.get('/getitems',getitems)
app.get('/getusers',getUsers)

app.post('/delete',deleteItem)


app.post('/update',updateItem)


app.post('/addtocart',addtoCart);


app.get('/getcart',getCart);







