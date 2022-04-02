import React from "react";
import image from '../home2.jpg';
import image1 from '../main2.jpg';
import Footer from "./Footer";
import './Home.css';


const CoustomerHome=()=>{
    return(
        <div>

            {/* <!-- Showcase --> */}

<section class="p-5 text-center text-sm-start">
    <div class="container">
        <div class="d-sm-flex align-items-center justify-content-between">
            <div>
                <h1>Are You <span class="text-warning">Hungry?</span></h1>
                <p class="lead my-4">We serve you delicious food at your home Order Now</p>
                <button class="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#enroll">Order Now</button>
            </div>
            <img class="img-fluid w-50 d-none d-sm-block" src={image} alt="" />
        </div>
    </div>
</section>


{/* <!-- Boxes --> */}


<section class="p-5">
    <div class="container">
       <div class="row text-center g-4">
           <div class="col-md">
               <div class="card">
                   <div class="card-body text-center">
                       <div class="h1 mb-3">
                       <i class="bi bi-person-square"></i>
                       </div>
                       <h3 class="card-title mb-3">Order Online</h3>
                    <p class="card-text">Stay Home, Stay Safe</p>
                   </div>
               </div>
           </div>
           <div class="col-md">
            <div class="card">
                <div class="card-body text-center">
                    <div class="h1 mb-3">
                        <i class="bi bi-person-square"></i>
                    </div>
                    <h3 class="card-title mb-3">Order Online</h3>
                    <p class="card-text">Stay Home, Stay Safe</p>
                </div>
            </div>
        </div>
        <div class="col-md">
            <div class="card">
                <div class="card-body text-center">
                    <div class="h1 mb-3">
                    <i class="bi bi-person-square"></i>
                    </div>
                    <h3 class="card-title mb-3">Order Online</h3>
                    <p class="card-text">Stay Home, Stay Safe</p>
                </div>
            </div>
        </div>
       </div>
    </div>
</section>


{/* <!-- Learn Sections --> */}


<section class="p-5" id="learn">
    <div class="container">
        <div class="row align-items-center justify-content-between">
            <div class="col-md">
                <img src={image} class="img-fluid" alt="" />
            </div>
            <div class="col-md p-5">
                <h2>Stay Home, Stay Safe</h2>
                <p class="lead">We ensure you your safety</p>
                <p>At the comfort of your home you can order delicious food</p>
                <a class="btn btn-light mt-3" href="#">
                    <i class="bi bi-chevron-right"></i>
                    Read More</a>
            </div>
        </div>
    </div>

</section>



<section class="p-5" id="learn">
    <div class="container">
        <div class="row align-items-center justify-content-between">
            
            <div class="col-md p-5">
                <h2>Stay Home, Stay Safe</h2>
                <p class="lead">We ensure you your safety</p>
                <p>At the comfort of your home you can order delicious food</p>
                <a class="btn btn-light mt-3" href="#">
                    <i class="bi bi-chevron-right"></i>
                    Read More</a>
            </div>
            <div class="col-md">
                <img src={image1} class="img-fluid" alt="" />
            </div>
        </div>
    </div>

</section>









 {/* Contact & Map  */}


  <section class="p-5">
      <div class="container">
          <div class="roe g-4">
              <div class="col-md">
                  <h2 class="text-center mb-4">Contact Info</h2>
                  <ul class="list-group list-group-flush lead">
                      <li class="list-group-item">
                          <span class="fw-bold">Main Location : </span>
                          A/98 Rudraksh Complex, Vadodara
                      </li>
                      <li class="list-group-item">
                        <span class="fw-bold">Phone : </span>
                        +91 1234567890
                    </li>
                    <li class="list-group-item">
                        <span class="fw-bold">Enrollment Email : </span>
                        contact@pizzalicious.com
                    </li>
                
                  </ul>
              </div>
              <div class="col-md">
                  <div id="map"></div>
              </div>
          </div>
      </div>
  </section>


            <Footer/>

               

        </div>
    );
}


export default CoustomerHome;