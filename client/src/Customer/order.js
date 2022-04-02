import React, { useContext, useEffect, useState } from "react";
import Order from "../Components/Admin/order";
import './order.css';
import axios from 'axios';
import Tracker from "./tracker";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router , Routes , Link, Route} from 'react-router-dom';

const PlaceOrder = (props)=>{

    const navigate = useNavigate();

    let arr = [];

    props.cart.cart1.map(p=>{
        arr.push(p.product_name);
    })

    // console.log(arr);

    const changeOverlay =()=>{
        props.setToggle();
    }

    const [order,setOrder]=useState({
        name:"",
        addr:"",
        email:"",
        contact:""
    })

    const [render,setRender] = useState(false);


    useEffect(()=>{

    },[render])

    const orderNow=()=>{
        //console.log(order)
        const current_order={
            name: order.name,
            address:order.addr,
            email:order.email,
            contact:order.contact,
            prod_name: arr,
            total : props.total
        }
        axios.post('http://localhost:5000/addOrder',current_order)
        .then(res=>{
            console.log("Order Sent")
            setRender(true);
            navigate('/currentOrder')
        }
        )
        .catchcatch(
            console.log("Failed to sent Order")
        )
    }


    const handleChange=(event)=>{
        const {name,value}=event.target
        setOrder({
            ...order,
            [name]:value
        })
        // console.log(order)
    }
    return(
        <div>


              <div className='' >
                     <div class='overlay' onClick={changeOverlay}></div>
                     <div className='modal-content'> 
                        <label>Name</label>
                        <input id='ip' type='text' name='name'  onChange={handleChange} placeholder="Enter Name"/><br/>
                        <label>Address</label>
                        <input id='ip' type='text' name='addr'  onChange={handleChange} placeholder="Enter Your Address"/><br/>
                        <label>Email</label>
                        <input id='ip' type='text' name='email'  onChange={handleChange} placeholder="Enter Your EmailID"/><br/>
                        <label>Contact No.</label>
                        <input id='ip' type='text' name='contact'  onChange={handleChange} placeholder="Enter Your Contact Number"/><br/><br/>
                        <Link to='/currentOrder' id='update' onClick={()=>orderNow()}>Place Your Order</Link>
                     </div>
                     
              </div> 


              {/* <Router>
                  <Routes>
                      <Route eaxct path='/currentOrder' element={<Tracker/>}></Route>
                  </Routes>
              </Router> */}

          
        </div>
    )
}


export default PlaceOrder;