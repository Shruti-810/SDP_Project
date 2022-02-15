import mongoose from 'mongoose'

const pizzaSchema=mongoose.Schema({
    name : String,
    description:String,
    size : String,
    price: Number,
    image : String
})


const Pizza=mongoose.model('Pizza',pizzaSchema);


export default Pizza;