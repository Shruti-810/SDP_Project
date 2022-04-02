import React,{useEffect, useState} from 'react';
import img from '../cart.png';
import {BrowserRouter as Router , Routes , Route,Link,useNavigate} from 'react-router-dom';
import Homepage from './customerHome';
import Cart from './cart';
import Login from '../Components/Admin/login';
import Register from '../Components/Admin/Registration';
import './navbar.css';
import '../img7.jpg'
import Newrestaurant from '../Components/Admin/AddRestaurant';
import Order from '../Components/Admin/order'
import AdminHomePage from '../Components/Admin/adminhome';
import Addnewitem from '../Components/Admin/additem';
import AllUser from '../Components/Admin/user'
import axios from 'axios';
import {BiUser} from 'react-icons/bi';
import {BsCart2} from 'react-icons/bs';
import CoustomerHome from './Home';
import Tracker from './tracker';

let Nav=()=>{

  const[admin,setAdmin]=useState({
    email:"",
    password:""
  })

  const[count,setCount]=useState({
    count1:"",
  })

  useEffect(()=>{
    let count_cart=()=>{
      let user=sessionStorage.getItem("loggedEmail")
      axios.get(`http://localhost:5000/total?email=${user}`)
      .then(res=>{
        // console.log(res.data)
        // console.log(res.data.length)
        setCount({
          count1:res.data.length
        })
        
      })
      .catch(
        console.log("Error in getting count")
      )
      console.log(count)
    }
    count_cart();
  },[])

  const [navbar,setNavbar]=useState(false);

  const changeNav=()=>{
    if(window.scrollY >= 10){
      setNavbar(true);
    }
    else{
      setNavbar(false);
    }
  } 
  window.addEventListener('scroll',changeNav);

    let isAdmin=false;
    if(sessionStorage.getItem('loggedEmail') === 'shrutimak810@gmail.com'){
      isAdmin=true;
    }


    const logout=()=>{
      sessionStorage.removeItem('loggedEmail');
      isAdmin=false;
      // navigate('/');
    }

    return(
    <div id='firstdiv'>
        { !isAdmin && ( 
                <Router>
      <nav className='main-nav'>
        <div className='logo'>
          <h2><span>P</span>izzalicious</h2>
        </div>
        <div className='menu-link'>
         <ul>
              <li id=''><Link to='/' id='nav-link'>Home</Link></li>
              <li id=''><Link to="/login" id='nav-link'>Login</Link></li>
              <li id=''><Link to="/register" id='nav-link'>Register</Link></li>
              <li id=''><Link to='/menu' id='nav-link'>Menu</Link></li>
              <li id=''><Link to='/currentOrder' id='nav-link'>Your Orders</Link></li>
         </ul>
        </div>
        <div className='icons'>
          <ul className=''>
          <li><Link to='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg></Link></li>
          <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></li>
          </ul>
          
        </div>
      </nav>
      <Routes>
      <Route exact path='/' element={<CoustomerHome/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route>
          <Route exact path='/menu' element={<Homepage/>}></Route>
          <Route exact path='/currentOrder' element={<Tracker/>}></Route>
      </Routes>
      </Router>)
       }

       { 
         isAdmin && (      <Router>
          <nav className='main-nav'>
            <div className='logo'>
              <button><h2><span>P</span>izzalicious</h2></button>
            </div>
            <div className='menu-link'>
             <ul>
                  {/* <li id=''><Link to='/' id='nav-link'>Home</Link></li>
                  <li id=''><Link to="/login" id='nav-link'>Login</Link></li>
                  <li id=''><Link to="/register" id='nav-link'>Register</Link></li>
         <li id=''><Link to='/menu' id='nav-link'>Menu</Link></li>*/}
             </ul> 
            </div>
            <div className='icons'>
              <ul className=''>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </svg></li>
    <li id='text'>WelcomeAdmin</li>
    {/* <button id='text'>Sign Out</button> */}
              </ul>
              
            </div>
          </nav>
          <Routes>
          <Route exact path='/admin' element={<AdminHomePage/>}></Route>
              <Route exact path='/admin/allusers' element={<AllUser/>}></Route>
              <Route exact path='/admin/getitems' element={<Newrestaurant/>}></Route>
              <Route exact path='/admin/order' element={<Order/>}></Route>
              <Route exact path='/admin/additem' element={<Addnewitem/>}></Route>
          </Routes>
          </Router>)
       }



    </div>
    )
}


export default Nav;