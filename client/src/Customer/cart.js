import React,{useState,useEffect} from 'react';
import axios from 'axios';

let Cart = () => {

    const [cart,setCart]=useState({
        id: "",
        cart1: [],
        user : ""
    })

    useEffect(()=>{
       getCart();
    })


    const getCart=()=>{
        axios.get("http://localhost:5000/getcart")
        .then(res=>{
            
            setCart({
                id : res.data._id,
                user : res.data.user,
                cart1 : res.data.cartitems 
            })
            console.log(cart);
        })
        .catch()
    }

    return (
        <div>
            {
                cart.cart1.map((i)=>{
                    return <div>
                    <h3>{i.product}</h3>
                    <h2>{i.quantity}</h2>
                    </div>
                })
            }

        </div>
    )
                
}


export default Cart;