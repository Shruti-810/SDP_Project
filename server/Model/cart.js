import mongoose from 'mongoose'
import { stringify } from 'uuid';



const cartSchema = mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId,ref: 'User' , required:true},
    cartitems : [
        {
            product_name : {type : String , ref:'Pizza' ,required:true},
            product_image : {type :String , ref:'Pizza' ,required:true},
            product_price : {type : String ,ref:'Pizza' , required:true},
            quantity : {type: Number, default : 1},
        }
    ]
},{timestamps:true});






const Cart=mongoose.model('Cart',cartSchema);


export default Cart;