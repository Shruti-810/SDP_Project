import React from 'react';
import {useNavigate} from 'react-router-dom'
import Addnewitem from './additem';
import Newrestaurant from './AddRestaurant';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Order from './order'
import img from '../../user.png';
import img1 from '../../items.png'
import img2 from '../../order.jpg';
import img3 from '../../additem.png'
import './adminhome.css'

let AdminHomePage = ({user}) => {
    const navigate = useNavigate();
    console.log("Admin : "+user);
    const navigate1=()=>{
        navigate('/admin/order')
    }
    const navigate2=()=>{
        navigate('/admin/getitems')
    }
    const navigate3=()=>{
        navigate('/admin/additem')
    }
    const navigate4=()=>{
        navigate('/admin/allusers')
    }
    return (
        <div class='container ml-5'>
            <div className='row' id='top'>
            <div id='div' onClick={navigate4} class='col'>
                <h4>Users</h4>
                <img src={img} alt='noimg' width='250px' height='250px'></img>
            </div>
            <div id='div' onClick={navigate2} class='col'>
            <h4>Menu Items</h4>
                <img class='item'src={img1} alt='noimg' width='250px' height='250px'></img>
            </div>
            <div class="w-100"></div>
            <div id='div' onClick={navigate1} class='col'>
            <h4>Orders</h4>
                <img src={img2} alt='noimg' width='250px' height='250px'></img>
            </div>
            <div id='div' onClick={navigate3} class='col'>
            <h4>Add Item</h4>
                <img src={img3} alt='noimg' width='250px' height='250px'></img>
            </div>
            </div>
        </div>
    )
}


export default AdminHomePage;