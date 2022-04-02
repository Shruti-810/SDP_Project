import Order from "../Model/order.js";
import Cart from "../Model/cart.js";
import User from "../Model/user.js"


export const AddOrder=(req,res)=>{
    const {name,address,email,contact,prod_name,total}=req.body
    const order=new Order({
        name: name,
        address: address,
        contact : contact,
        email : email,
        products : prod_name,
        total : total,
        status : "Placed"
    })
    order.save(err=>{
        if(err){
            console.log("Can't store Order")
        }
        else{
            console.log("Order Stored");
        }
    })
    User.findOne({email:email},(err1,data)=>{
        if(data){
            Cart.findOneAndDelete({user : data._id},(error)=>{
                if(error){
                    console.log("Cart can't be Deleted")
                }
                else{
                    console.log("Cart Deleted")
                }
            })
        }
    })
}




export const getStatus=(req,res)=>{
    Order.findOne({email:req.query.email},(err,data)=>{
        if(data){
            res.send(data.status);
        }
        else{
            console.log("Can not send status");
        }
    })
}



export const ChangeStatus=(req,res)=>{
    console.log(req.body)
    const user=req.body.email;
    const status=req.body.status;
    Order.findOneAndUpdate({email:user},{status:status},(err,data)=>{
        if(data){
            console.log("Status Updated");
        }
        else{
            console.log("Can not update Status");
        }
    })
}


export const getOrders = (req,res)=>{
    Order.find((err,data)=>{
        if(data){
            res.json(data);
        }
        else{
            console.log("Can't fetch Orders");
        }
    })
}