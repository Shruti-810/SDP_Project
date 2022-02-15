import Cart from '../Model/cart.js';


export const getCart=(req,res)=>{
    Cart.findOne({user : "61fd37dc1a82cdf53958157f"},(err,data)=>{
        if(err){
            console.log("Cart is Empty");
        }
        else{
            res.json(data);
        }
    })
}

export const addtoCart=(req,res)=>{
    res.json({message : "cart in Front-End"})

    Cart.findOne({user : "61fd37dc1a82cdf53958157f"},(err,cart)=>{
        if(err){
            const cart = new Cart({
                user: "61fd37dc1a82cdf53958157f",
                cartitems : [
                    {
                       product : req.body.id,
                       quantity : 2,
                       Price : req.body.price,
                    }
                ]
           })
           cart.save((err,cart)=>{
               if(err){
                   console.log(err.message)
               }
               else{
                   console.log("Cart in DB")
               }
           })
        }
        else{
            Cart.findOneAndUpdate({user : "61fd37dc1a82cdf53958157f"},{
                   "$push" : {
                       "cartitems" :{
                           product : req.body.id,
                           quantity : 2,
                           Price : req.body.price,
                       }
                   }
            },(err,data)=>{
                if(err){
                    console.log("Cart can't be updated")
                }
                else{
                    console.log("Cart Updated");
                }
            })
            console.log("User is there");
        }
    })
}





