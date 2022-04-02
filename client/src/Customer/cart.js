import React,{useState,useEffect, createContext} from 'react';
import axios from 'axios';
import './Cart.css'
import PlaceOrder from './order';
import {  useNavigate } from 'react-router-dom';


let Cart = () => {

    const userContext = createContext();

    const navigate = useNavigate();
    const [cart,setCart]=useState({
        cart1: [],
    })

    const [order,setOrder] = useState(false);

    let total=0;


    if(cart.cart1.length>0){
        cart.cart1.map(a=>{
            return total=total+Math.floor(a.product_price);
        })
        console.log(total);
    }



    useEffect(()=>{

        getCart();

    });


    const getCart=()=>{
        const current_user = sessionStorage.getItem("loggedEmail")
        console.log(current_user)
        axios.get(`http://localhost:5000/getcart/?email=${current_user}`)
        .then(res=>{
            console.log("Getting Cart")
            console.log(res.data.cartitems)
            setCart({
                ...cart,
                cart1 : res.data.cartitems
            })
        })
        .catch(
            console.log("Getting error in fetching cart")
        )
        console.log(cart)
    }

    const deleteCart=(id)=>{
        console.log("Deleting cart");
        const product_id={
            id,
            user:sessionStorage.getItem("loggedEmail")
        }
        axios.post("http://localhost:5000/deleteCart",product_id)
        .then(res=>{
            console.log("Item Deleted")
        })
        .catch(
            console.log("Can't delete Item")
        )
    }

    const OrderNow=()=>{
        setOrder(!order);
       
    }
    

    


    
    return (
        <div className='row'>

<div className='container col' id='cart-main'>
            {

                (cart.cart1.length > 0 &&
                    cart.cart1.map(element => {
                        return <div className='cart'>
                            <div className='image'>
                                <img className='img' alt='noimg' src={require(`../image/${element.product_image}`)} />
                            </div>
                            <div className='desc'>
                                <h4 className='h4'>{element.product_name}</h4>
                                <button className='button' onClick={() => deleteCart(element._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>


                            </div>
                            <div className='price'>
                                <h4 className=''>{element.product_price}/-</h4>
                            </div>
                        </div>
                        
                    })
                )

            }
          
        

            </div>
            
            <div id='total' className='col-1'>
                Total :
                {
                    (cart.cart1.length > 0 && <p>{total}/-</p>)
                }
                <button onClick={() => OrderNow()} className='btn btn-secondary' id='totalbtn'>Order Now</button>
            </div>

            


        

          {order && <PlaceOrder total={total} cart={cart} setToggle={OrderNow}/>}





        </div>
    )
}
                



export default Cart;