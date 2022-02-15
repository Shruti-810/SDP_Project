import React,{useState} from 'react';
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

let Nav=()=>{

  const[admin,setAdmin]=useState({
    email:"",
    password:""
  })

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
    <div>
      <Router>
        { !isAdmin && ( 
          <div>
          <div id='nav' className=''>
            <ul class="main" id={!navbar ? 'navbar-active' : 'navbar'}>
              <li id='nav-li'><Link to="/cart" id='nav-link'><img src={img} alt='nimg'/></Link></li>
              <li id='nav-li'><Link to='/ok' id='nav-link'>Offers</Link></li>
              <li id='nav-li'><Link to='/ok' id='nav-link'>Menu</Link></li>
              <li id='nav-li'><Link to="/login" id='nav-link'>Login</Link></li>
              <li id='nav-li'><Link to="/register" id='nav-link'>Register</Link></li>
              <li id='nav-li'><Link to='/' id='nav-link'>Home</Link></li>
            </ul>            
          </div>
          <Routes>
          <Route exact path='/' element={<Homepage/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route></Routes>
          </div>)
       }

       { 
         isAdmin &&
         (<div>
         <div id='nav' className=''>
         <ul class="main" id={!navbar ? 'navbar-active' : 'navbar'}>
         <li id='nav-li'><div id='nav-link' onClick={logout}>Logout</div></li>
           <li id='nav-li'><Link to='/admin/order' id='nav-link'>Orders</Link></li>
           <li id='nav-li'><Link to="/admin/getitems" id='nav-link'>View Items</Link></li>
           <li id='nav-li'><Link to="/admin/additem" id='nav-link'>Add Item</Link></li> 
           <li id='nav-li'><Link to='/admin' id='nav-link'>Home</Link></li>
           
         </ul>            
         </div>
         <Routes>
         {/* <Route exact path='/' element={<Homepage/>}></Route> */}
         <Route exact path='/admin' element={<AdminHomePage/>}></Route>
        <Route exact path='/admin/order' element={<Order/>}></Route>
        <Route exact path='/admin/additem' element={<Addnewitem/>}></Route>
        <Route exact path='/admin/getitems' element={<Newrestaurant/>}></Route>
        <Route exact path='/admin/allusers' element={<AllUser/>}></Route></Routes>
         </div>)
    
       }


      </Router>
    </div>
    )
}


export default Nav;