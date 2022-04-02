// same as const express=require('express')
import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import cors from 'cors';
import mongoose from 'mongoose';
import { addUser,registerUser,getUsers,UserLogin } from "./Controllers/user.js";
import { addtoCart,getCart,getOneItem,getCount,deleteCart } from './Controllers/cart.js'
import { addItem,getitems,deleteItem,updateItem } from "./Controllers/pizza.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import session from "express-session";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { AddOrder, ChangeStatus, getOrders,getStatus } from "./Controllers/order.js";
import http from 'http';


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
    useUnifiedTopology: true, 
    useNewUrlParser: true
},()=>{
    console.log("Database Connected")
})

const server1 = app.listen(PORT,()=>{
    console.log("Server Running at : "+PORT);
})








// Routes
app.post("/login",addUser )
// app.get('/login',UserLogin)
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
app.get('/getoneitem',getOneItem);

app.get('/total',getCount)

app.post('/deleteCart',deleteCart);


app.post('/addOrder',AddOrder);
app.get('/getOrders',getOrders);
app.post('/changeStatus',ChangeStatus);
app.get('/getTracking',getStatus);



// Socket

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors : {
        origin: 'http://localhost:3000'
    }
});


httpServer.listen(3001,()=>{
    console.log("Socket Running")
});

io.on("connection", (socket) => {
//    console.log("A user connected") 
//    console.log(socket.id)
    socket.on("send_status",(data)=>{
       console.log(data)
       socket.broadcast.emit('receive_status', data);
    })
});

// End Socket







