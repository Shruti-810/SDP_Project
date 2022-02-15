import Pizza from '../Model/pizza.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



export const addItem=(upload.single('image'),(req,res)=>{
    // console.log(req.file);
    const name= req.body.name;
    const desc = req.body.desc;
    const size =req.body.size;
    const price = req.body.price;
    const image = req.file.filename;
    const pizza = new Pizza({
        name : name,
        description:desc,
        size : size,
        price: price,
        image : image
    })
    pizza.save(error=>{
        if(error){
            console.log({"message" : error.message});
        }
        else{
            console.log("Added")
            res.send({message:pizza})
        }
    })
});



export const getitems=(req,res)=>{
        Pizza.find({},(err,data)=>{
        if(err)
        {
            console.log({"message" : err.message})
        }
        else{
            // console.log(data);
            res.json(data);
        }
    })
}


export const deleteItem=(req,res)=>{
    console.log("This is req : ");
    console.log(req.body);
    Pizza.findOneAndDelete({_id:req.body.id},(err,data)=>{
        if(err)
        {
            console.log(err.message)
        }
        else
        {
            console.log("Deleted User : "+data);
        }
    })
 }




export const updateItem=((req,res)=>{
    console.log("Update")
    const name= req.body.name;
    const desc = req.body.desc;
    const size =req.body.size;
    const price = req.body.price;
    const image = req.body.image;
    console.log(req.body)
     Pizza.findOneAndUpdate({_id:req.body.id},{name: name,description:desc,size:size,price:price},(err,data)=>{
        if(err)
        {
            console.log(err.message)
        }
        else
        {
            console.log("Updated User : "+data);
        }
    })
});



