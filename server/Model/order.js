import mongoose from "mongoose";
import { stringify } from "uuid";



const orderSchema = mongoose.Schema({
    name: String,
    address:String,
    contact : Number,
    email : String,
    products : [String],
    total : Number,
    status : String,
});


const Order= mongoose.model('Order',orderSchema);


export default Order;