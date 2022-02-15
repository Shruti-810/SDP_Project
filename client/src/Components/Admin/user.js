import React,{useState,useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const AllUser = ()=>{


    const [data1,setData]=useState({
        data:[]
     })


     useEffect(()=>{
        getUsers();
      })
    const getUsers=()=>{
        axios.get('http://localhost:5000/getusers/')
        .then((res)=>{
           setData({
              data : res.data
           }) 
           // console.log("This is data1 : "+data1)
             console.log(data1)
         })
         .catch((err)=>{
           console.log("Data lost")
           console.log(err.message)
        })
     }
    return(
        <div class='table'>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
            </tr>
            {
                data1.data.map((i)=>{
                    return <tr>
                        <td>{i.name}</td>
                           <td>{i.email}</td>
                    </tr>
                })
            }
        </div>
    )
}


export default AllUser