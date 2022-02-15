import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './additem.css'

let Register=()=>{
    
    const navigate=useNavigate();
    const[user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const handleChange=(event)=>{
        const {name,value}=event.target
        console.log({name,value});
        setUser({
            ...user,
            [name]:value
        })
    }


    const register=()=>{
        const {name,email,password,confirmpassword}=user;
        if(name && email && password && (password===confirmpassword)){
            axios.post("http://localhost:5000/register",user)
            .then(res=>alert(res.data));
            navigate('/login');
        }
        else{
            alert("Invalid Input");
        }
        
    }
    return(
        <div class='login-box'>
            <div><label>Name</label>
            <input class="user-box" type='text' name='name' value={user.name} placeholder='Enter Your Name' onChange={handleChange}></input><br/>
            <br/>
            </div>
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
            <div>
            <label>Enter Password Again</label>
            <input class="user-box" type='password' name='confirmpassword' value={user.confirmpassword} placeholder='Enter Your Password Again' onChange={handleChange}></input><br/>
            <br/>
            </div>
            <button onClick={register} class="btn btn-outline-secondary" id='new'>Sign Up</button><br/><br/>
            <small>Already have an account? Login Here</small><br/><br/>
            <button onClick={()=>{navigate('/login')}} class="btn btn-outline-secondary" id='new'>Sign In</button>
        </div>
    );
}

export default Register;