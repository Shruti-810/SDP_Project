import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addrestaurant.css';
import axios from 'axios';


let Newrestaurant=()=>{
   const [item,setItem]=useState({
      id: "",
      name : "",
      desc: "",
      size : "",
      price : "",
      image:""
  })
  const handleChange=(event)=>{
      event.persist();
      setItem({
          ...item,
          [event.target.name]:event.target.value
      })
      console.log(item);
  
  }

  const handleImg=(event)=>{
      event.persist();
      setItem({
          ...item,
          image:event.target.files[0]
      })
      console.log(item);
  }

   const [data1,setData]=useState({
      data:[]
   })

   const [toggle,setToggle]=useState(false)


   useEffect(()=>{
     getItems();
   })
   
   const getItems=()=>{
      axios.get('http://localhost:5000/getitems/')
      .then((res)=>{
         setData({
            data : res.data
         }) 
         // console.log("This is data1 : "+data1)
         //  console.log(data1)
       })
       .catch((err)=>{
         console.log("Data lost")
         console.log(err.message)
      })
   }


   const deleteItem=(id,name)=>{
      console.log("Can be deleted here");
      console.log({id:id,name:name})
      axios.post('http://localhost:5000/delete',{id:id,name:name})
      .then(console.log("Sent"))
      .catch(console.log("Error"));
   }


   const updateItem=(event)=>{
      // event.persist();
      event.preventDefault();
      setToggle(!toggle)
      console.log("Can be updated here");
      console.log(item);
      axios.post('http://localhost:5000/update',item)
      .then(console.log("Sent"))
      .catch(console.log("Error"));
   }
   
   const toggleModal=(id,name,description,size,price,image)=>{
      setToggle(!toggle)
      setItem({
         id:id,
         name:name,
         desc:description,
         size:size,
         price:price,
         image:image
      })
      console.log(item)
   }
   

   // if(toggle){
   //    document.body.classList.add('active-modal');
   // }
   // else{
   //    document.body.classList.remove('active-modal');
   // }

 

   return (
   <div>
         <div className='container' id='main'>
            <div className='row'>
               {
                  data1.data.map((i) => {
                     return <div className='col-3 m-3' >

                            <div className='container' id='box'>
                                 <div id='row'>
                              <div className='col'>
                                 <img alt='noimg' src={require(`../../image/${i.image}`)} />
                              </div>
                              <div className='col pl-2' id='grid'>
                                 <h2>{i.name}</h2>
                                 <small id='sm'>{i.description}</small><br/>
                                 <br/>
                                 <h6>{i.size}</h6>
                                 <h6>{i.price}/-</h6>
                                 <button className=' ml-32 mb-2' onClick={() => deleteItem(i._id, i.name)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1H6v-1Zm5 0v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5ZM4.5 5.029a.5.5 0 1 1 .998-.06l.5 8.5a.5.5 0 0 1-.998.06l-.5-8.5Zm6.53-.528a.5.5 0 0 1 .47.528l-.5 8.5a.5.5 0 1 1-.998-.058l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg></button>
                                 <button className='ml-5 mb-2' onClick={() => toggleModal(i._id, i.name, i.description, i.size, i.price, i.image)} >
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
                                 </button>
                              </div>
                              
                              
                              </div>
                              </div>

                           </div>                
 
                })
              }
            </div>
         </div>
         



       {toggle && ( 
                     <div className='' >
                     <div class='overlay' onClick={toggleModal}></div>
                     <div className='modal-content'>
                     {/* <button className='close-modal' onClick={() => updateItem(item)}>Close</button> */}
                        <label>Name</label>
                        <input id='ip' type='text' name='name' value={item.name} onChange={handleChange} placeholder="Enter Name"/><br/>
                        <label>Description</label>
                        <input id='ip' type='text' name='desc' value={item.desc} onChange={handleChange} placeholder="Enter Description"/><br/>
                        <label>Size</label>
                        <input id='ip' type='text' name='size' value={item.size} onChange={handleChange} placeholder="Enter Size"/><br/>
                        <label>Price</label>
                        <input id='ip' type='text' name='price' value={item.price} onChange={handleChange} placeholder="Enter Price"/><br/><br/>
                        <input type='file' onChange={handleImg} name='image' src={item.image}/><br/><br/>
                        <button onClick={updateItem} id='update'>Update</button>
                        
                     </div>
                     
                     </div> )
               }
                   

   </div>
   );
}


export default Newrestaurant;