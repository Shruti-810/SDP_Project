import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import './additem.css'


let Login=()=>{
    const navigate = useNavigate();
    const[user,setUser]=useState({
        email:"",
        password:""
    })
    const handleChange=(event)=>{
        const {name,value}=event.target
        setUser({
            ...user,
            [name]:value
        })
        console.log(user)
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/login")
        .then(res=>{
            console.log(res.data)
        })
    },[])
    const login=()=>{
        axios.post('http://localhost:5000/login',user)
        .then(res=>{
            sessionStorage.setItem('loggedEmail',res.data.user.email)
            if(res.data.message === "Admin Login")
            {
                setUser({
                    email : res.data.user.email,
                    password : res.data.user.password
                });
                navigate('/admin');
            }
            else{
                setUser({
                    email : res.data.user.email,
                    password : res.data.user.password
                });
                navigate('/');
            }
        });
    }
    return(
        <div class='login-box'>
        <div>
        <label>Email ID</label>
        <input class="user-box" type='text' name='email' value={user.email} placeholder='Enter Your Email ID' onChange={handleChange}></input><br/>
        <br/>
        </div>
        <div>
        <label>Password</label>
        <input class="user-box" type='password' name='password' value={user.password} placeholder='Enter Your Password' onChange={handleChange}></input><br/>
        <br/>
        </div>
        <button onClick={login} class="btn btn-outline-secondary" id='new'>Sign In</button><br/><br/>
        <small>Already have an account? Login Here</small><br/><br/>
        <button onClick={()=>{navigate('/login')}} class="btn btn-outline-secondary" id='new'>Sign Up</button>
    </div>
    );
}
export default Login;