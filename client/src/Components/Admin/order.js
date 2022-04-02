import React, { useEffect, useRef, useState } from 'react';
import './user.css';
import axios from 'axios';
import Tracker from '../../Customer/tracker';
// import io from 'socket.io-client';
import Socket from '../../socket.js'


// const socket=io.connect('http://localhost:3001');

let Order =()=>{


   

    const [order,setOrder]=useState({
        data:[]
    })

    const [status,setStatus] = useState('')

    useEffect(()=>{
        getOrders();
        // socket.on('receive_status',console.log("Receiving"))
    });





    
    const getOrders = ()=>{
        axios.get("http://localhost:5000/getOrders")
        .then(res=>{
            setOrder({
                data : res.data
            })
        })
        .catch(
            console.log("Order fetching Failed")
        )
    }



    const changeStatus = (email,event)=>{
        setStatus(event.target.value)
        sendStatus(event.target.value);
        const request = {
            email : email,
            status : event.target.value
        }
        console.log(request)
        axios.post("http://localhost:5000/changeStatus",request)
        .then(res=>{
            console.log("Status Changed")
            sendStatus();
        })
        .catch(
            console.log("Can't change Status")
        )
        console.log("Changing status")
    }


    const sendStatus=(data)=>{
        console.log("Sending status")
        console.log(data);
        Socket.emit("send_status",data)
    }


    return(
        <div>



<div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email ID</th>
            <th>Products</th>
            <th>Status</th>
            <th>Total</th>
        </tr>
        </thead>
        <tbody>
        {
               order.data.length>0 && 
               order.data.map((i)=>{
                return <tr>
                    <td>{i.name}</td>
                    <td>{i.address}</td>
                    <td>contact</td>
                    <td>{i.email}</td>
                    <td>{i.products.length>0 && i.products.map(p=>{return <p>{p}</p>})}
                    
                    </td>
                    <td id='status'>
                    <select value={i.status} name='status' onChange={(event)=>changeStatus(i.email,event)}>
                        <option value='Placed'>Placed</option>
                        <option value='Confirmed'>Confirmed</option>
                        <option value='Prepared'>Prepared</option>
                        <option value='Out For Delivery'>Out For Delivery</option>
                        <option value='Completed'>Completed</option>
                    </select>
                    </td>
                    <td>{i.total}</td>
                    </tr>
                })
         }
        </tbody>
    </table>



</div>
        </div>
    )
}


export default Order;
