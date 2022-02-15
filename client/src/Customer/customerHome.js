import React,{useState,useEffect} from "react";
import axios from 'axios';
import img from "../image/74a41306-e80a-42a0-b5a3-8125b5df0d10-1643775664891.jpg";
import './customerhome.css';
import 'bootstrap/dist/css/bootstrap.min.css';



let Homepage = () => {
    const [data1, setData] = useState({
        data: []
    })


    useEffect(() => {
        getItems();
    })


    const addToCart=(_id)=>{
       const id=_id;
       const price=319;
       axios.post("http://localhost:5000/addtocart/",id,price)
       .then()
       .catch()
    }



    const getItems = () => {
        axios.get('http://localhost:5000/getitems/')
            .then((res) => {
                setData({
                    data: res.data
                })
                // console.log("This is data1 : "+data1)
                // console.log(data1)
            })
            .catch((err) => {
                // console.log("Data lost")
                console.log(err.message)
            })
    }
    return (
        <div>
             {/* <section class="container">
                <div class="container mx-auto flex items-center justify-between">
                    <div class="w-1/2">
                        <h6 class="text-lg"><em>are you hungry?</em></h6>
                        <h1 class="text-6xl font-bold">Don't wait!</h1>
                        <button class="px-6 py-2 rounded-full text-white font-bold mt-4 btn-primary"> Order now</button>
                    </div>
                    <div class="w-1/2">
                        <img src={img} alt="" />
                    </div>

                </div>
            </section>  */}

            <div className="continer" id='home-div'>
            <div className="row">
                <div className="col" id='home-div-first'>
                        <div class="main">
                        <h6 class="text-lg"><em>are you hungry?</em></h6>
                        <h1 class="text-6xl font-bold">Don't wait!</h1>
                        <button class="px-6 py-2 rounded-full text-white font-bold mt-4 btn-secondary"> Order now</button>
                        </div>
                </div>
                <div class="col" id='home-div-second'>
                        <img src={img} alt=""/>
                </div>
            </div>
            </div>
            <div className='container' id='main'>
                <div className='row'>
                    {
                        data1.data.map((i) => {
                            return <div className='col-3 m-3' >

                                <div className='container' id='box'>
                                    <div id='row'>
                                        <div className=''>
                                            <img alt='noimg' src={img} />
                                        </div>
                                        <div className='pl-2'>
                                            {/* <h5>{i._id}</h5> */}
                                            <h5 id='h4'>{i.name}</h5>
                                            <small>{i.description}</small><br />
                                            <h6>{i.size}</h6>
                                            <h6>{i.price}/-</h6>
                                            <button onClick={()=>addToCart(i._id)} class="btn btn-outline-secondary mb-2">Add to Cart</button>
                                        </div>


                                    </div>
                                </div>

                            </div>

                        })
                    }
                </div>
            </div>
        </div>
        );

}


export default Homepage