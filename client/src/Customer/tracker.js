import React, { useState,useEffect, useRef } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './tracker.css'
import Socket from "../socket";

const Tracker = ()=>{


    const element = useRef();
    const [status,setStatus]=useState("")


    useEffect(()=>{
        getTracking();
        Socket.on('receive_status',(data)=>{
            console.log("Working");
            setStatus(data);
        })
    });

    const getTracking=()=>{
        const email=sessionStorage.getItem('loggedEmail')
        axios.get(`http://localhost:5000/getTracking?email=${email}`)
        .then(res=>{
            console.log(res.data)
            setStatus(res.data)
            updateClass(res.data);
        })
        .catch(
            console.log("Can't catch Status")
        )
        // updateClass(status);
    }

    // Change class for status

    const updateClass = (status)=>{
        // console.log(status);
        console.log(element.current.childNodes[1].className)
        element.current.childNodes.forEach(e => {
            if(status == 'Placed'){
                element.current.childNodes[0].className += " current";
            }
            else if(status == 'Confirmed'){
                element.current.childNodes[1].className += " current";
            }
            else if(status == 'Prepared'){
                element.current.childNodes[2].className += " current";
            }
            else if(status == 'Out For Delivery'){
                element.current.childNodes[3].className += " current";
            }
            else if(status == 'Completed'){
                element.current.childNodes[4].className += " current";
            }
            // if(e.innerText == status){
            //     e.className += " step-completed";
            // }
        });
    }

    // let socket = io()
    // if(status){
    //     socket.emit('join' , `order_${status}`)
    // }
    
    
    return(
        <div>
            {/* <h1>Current Status of Food : {status}</h1> */}


            <section class="status">
    <div class="container mx-auto">
        <div class="status-box w-full lg:w-2/3 mx-auto">
            <div class="flex items-center justify-between mb-12">
                {/* <h1 class="text-xl font-bold">Track delivery status</h1> */}
                {/* <h6 class="bg-white py-1 rounded-full px-4 text-green-600 text-xs">ID from Server</h6> */}
                <input id="hiddenInput" type="hidden" value="<%= JSON.stringify(order) %>" />
            </div>
            <ul ref={element}>
                <li class="status_line text-sm md:text-xl pb-16" value="order_placed"><span>Placed</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16" value="confirmed"><span>Confirmed</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16" value="prepared"><span>Prepared</span></li>
                <li class="status_line text-sm md:text-xl pb-16" value="delivered"><span>Out For Delivery</span>
                </li>
                <li class="status_line text-sm md:text-xl" value="completed"><span>Completed</span></li>
            </ul>
        </div>
    </div>
</section>



           
  




        </div>
    );
}


export default Tracker;