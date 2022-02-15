import axios from "axios";
import React ,{useState} from "react";
import './additem.css'
// import FileBase64 from 'react-file-base64';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


let Addnewitem=()=>{
    const navigate = useNavigate();
    const [item,setItem]=useState({
        name : "",
        desc: "",
        size : "",
        price : "",
        image:""
    })
    const handleChange=(event)=>{
        setItem({
            ...item,
            [event.target.name]:event.target.value
        })
        console.log(item);
    
    }

    const handleImg=(event)=>{
        setItem({
            ...item,
            image:event.target.files[0]
        })
        console.log(item);
    }

  

    const uploadItem=(e)=>{
       // console.log(item.image);
        //console.log(item.image.name)
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', item.name);
        formData.append('desc', item.desc);
        formData.append('size', item.size);
        formData.append('price', item.price);
        formData.append('image', item.image,item.image.name);
        console.log(formData)
        axios.post('http://localhost:5000/additems', formData)
             .then(
                 setItem({
                    name : "",
                    desc: "",
                    size : "",
                    price : "",
                    image: "",
                 }),
                 navigate('/admin/getitems')
             )
             .catch(console.log("Error"))
             
    }
    return(
 
<div>

<div class="login-box">
  {/* <h2>Login</h2> */}
    <div >
      <label>Name</label>
    <input class="user-box" type='text' name='name' value={item.name} onChange={handleChange} placeholder="Enter Name"/><br/><br/>
    </div>
    <div>
      <label>Description</label>
    <input class="user-box" type='text' name='desc' value={item.desc} onChange={handleChange} placeholder="Enter Description"/><br/><br/>
    </div>
    <div >
      <label>Size</label>
    <input class="user-box" type='text' name='size' value={item.size} onChange={handleChange} placeholder="Enter Size"/><br/><br/>
    </div>
    <div >
      <label>Price</label>
    <input class="user-box" type='text' name='price' value={item.price} onChange={handleChange} placeholder="Enter Price"/><br/><br/>
    </div>
    <div class="">
    <input class='file' type='file' onChange={handleImg} name='image'/><br/><br/><br/>
    </div>
    <button id='btn' class="btn btn-outline-secondary" onClick={uploadItem}>
      Add
    </button>
</div>



</div>
    );
}


export default Addnewitem;