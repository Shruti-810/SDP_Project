import React from 'react';
import {BrowserRouter as Router ,Link , Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Addnewitem from './additem';
import Newrestaurant from './AddRestaurant';
import './Navbar.css'


const Navbar = () => {
    return (
        <div>
        <Router>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <Link to='/' className='navbar-brand text-light ml-8'>Navbar</Link>
                <button class="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon text-light"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav float-right">

                        <Link to='/' className="nav-item nav-link active text-light"> Home <span class="sr-only">(current)</span></Link>
                        <Link to='/additem' className="nav-item nav-link text-light" >Add Item</Link>
                        <Link to='/getitems' className='nav-item nav-link text-light' >View Items</Link>
                        <Link to='/orders' className='nav-item nav-link text-light'>Orders</Link>
                    </div>
                </div>
            </nav>
            <div className='row'>
      {/* <div id='vertical' className='bg-dark col-2'>

      </div> */}



            <Routes >
                <Route exact path='/getitems' element={<Newrestaurant />} className='col-2'></Route>
                <Route exact path='/additem' element={<Addnewitem />} className='col-2'></Route>
            </Routes>
            </div>
        </Router>

    </div>
    );
}



export default Navbar;