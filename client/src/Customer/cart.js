import React,{useState,useEffect} from 'react';
import axios from 'axios';




let Cart = () => {

    const [cart,setCart]=useState({
        cart1: [],
    })

    let total=0;


    if(cart.cart1.length>0){
        cart.cart1.map(a=>{
            return total=total+Math.floor(a.product_price);
        })
        console.log(total);
    }


    // let render=0;
    useEffect(()=>{

        getCart();
        // return () => {
        //     setCart({}); 
        // };
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
        // <Homepage/>
    }
    

    


    
    return (
        <div>

            {

                (cart.cart1.length > 0 &&
                    cart.cart1.map(element => {
                        return <div className='container'><div className='row'>
                            <div className='col'>
                                <img className='col' alt='noimg' src={require(`../image/${element.product_image}`)} />
                            </div>
                            <div className='col'>
                                <h4 className='col'>{element.product_name}</h4>
                                {/* <h4 className='col'><button className='btn btn-secondary'>-</button>{element.quantity}<button className='btn btn-secondary'>+</button></h4> */}
                                <button className='col btn btn-secondary' onClick={() => deleteCart(element._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>


                            </div>
                            <div className='col'>
                                <h4 className='col'>{element.product_price}/-</h4>
                            </div>
                        </div>
                        </div>
                    })
                )

            }


            <div>
                Total :
                {
                    (cart.cart1.length > 0 && <p>{total}/-</p>)
                }

            </div>

            <button onClick={() => OrderNow()}>Order Now</button>




        </div>
    )
}
                



export default Cart;