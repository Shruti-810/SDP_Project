import Cart from '../Model/cart.js';
import User from '../Model/user.js';
import Pizza from '../Model/pizza.js';


export const getCart = (req, res) => {
    User.findOne({ email: req.query.email }, (err, data) => {
        if(data){
            Cart.findOne({user : data._id},(err,cart)=>{
                if(cart){
                    // console.log(cart.cartitems.length);
                    res.json(cart);
                }
                else{
                    console.log("No cart for this user");
                }
            })
        }
        else{
            console.log("User does not exist for geeting whole cart");
        }
    })
}

export const getCount=(req,res)=>{
    User.findOne({email:req.query.email},(err,data)=>{
        if(data){
            Cart.findOne({user:data._id},(_err1,cart)=>{
                if(cart){
                    // console.log(cart.cartitems.length)
                    res.send(cart.cartitems)
                    console.log(cart.cartitems.length)
                }
                else{
                    console.log("Cart does not exist for this user")
                    // res.send(0)
                }
            })
        }
        else{
            console.log("User does not exist");
        }
    })
}



export const getOneItem=(req,res)=>{
    // console.log(req.query);
    // res.send(req.query);
    console.log("Called");
    Pizza.findOne({_id: req.query.item_id},(err,data)=>{
        if(data){
            res.send(data);
        }
        else{
            console.log("Item does not exist");
        }
    })
}


export const addtoCart = (req, res) => {
    // console.log(req.body)
    User.findOne({ email: req.body.user }, (error, data) => {
        if (data) {
            var current_user = data._id;
            console.log(current_user)
            Cart.findOne({ user: current_user }, (err1, cart_user) => {
                if (cart_user) {
                    console.log("User is there");
                    Cart.findOneAndUpdate({ user: current_user }, {
                        "$push": {
                            "cartitems": {
                                product_name : req.body.name,
                                product_image:req.body.image,
                                product_price:req.body.price,
                                quantity:1
                            }
                        }
                    }, (err2, data) => {
                        if (err2) {
                            console.log("Cart can't be updated for existing cart")
                        }
                        else {
                            console.log("Cart Updated for existing cart");
                        }
                    })
                }
                else {

                    console.log("User is not there");
                    const cart = new Cart({
                        user: current_user,
                        cartitems: [
                            {
                                product_name : req.body.name,
                                product_image:req.body.image,
                                product_price:req.body.price,
                                quantity:1
                            }
                        ]
                    })
                    cart.save((err3, cart) => {
                        if (err3) {
                            console.log("Cart can't created for new user")
                        }
                        else {
                            console.log("Cart created for new user")
                        }
                    })
                }
            })
        }
        else {
            console.log("User does not exist")
        }
    })
}


export const deleteCart=(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.user},(err,data)=>{
        if(data){
            Cart.findOne({user:data._id},(err1,cart)=>{
                if(cart){
                    let pos=cart.cartitems.findIndex(a=> a._id == req.body.id)
                    console.log(pos)
                    cart.cartitems.splice(pos,1)
                    cart.save(err2=>{
                        if(err2){
                            console.log("Can't Delete")
                        }
                        else{
                            console.log("Deleted cart")
                        }
                    })
                }
                else{
                    console.log("Can't find cart")
                }
            })
        }
        else{
            console.log("User does not exist")
        }
    })
}

