import User from "../Model/user.js ";
import bcrypt from 'bcrypt';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import express from 'express'

const app=express();
app.use(cookieparser());
app.use(session({
    key : "userID",
    secret : "subscribe",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expire: 60*60*24
    }
}))
const saltRounds = 10

export const UserLogin=(req,res)=>{
    console.log(req.session.user)
    if(req.session.user){
       res.send({loggedin : true},req.session.user)
    }
    else{
        res.send({loggedin : false})
    }
}

export const addUser=(req,res)=>{
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
                    req.session.user = user
                    console.log(req.session.user)
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
}


export const registerUser=(req,res)=>{
    const {name,email,password}=req.body;


    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err){
            console.log(err.message)
        }

  
    User.findOne({email:email},(error,user)=>{
        if(user){
            res.send({message:"User Already Registered"})
        }
        else{
           const user = new User({
               name : name,
               email,
               password : hash
           })
           user.save(error=>{
               if(error){
                   console.log("Error in registering : "+error.message);
                   res.send(error);
               }
               else{
                   console.log("Successfully Registered");
                   res.send({
                       message : "Successfully Registered"
                   })
               }
           })
        }
    })
    
})
    
}



export const getUsers=(req,res)=>{
    User.find({},(err,data)=>{
        console.log(data)
    if(err)
    {
        console.log({"message" : err.message})
    }
    else{
        // console.log(data);
        res.json(data);
    }
})
}