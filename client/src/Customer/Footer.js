import React from "react";
import './Footer.css'


const Footer=()=>{
    return(
        <div>
            <footer>
                <div className="footer-content">
                    <h3>Pizzalicious</h3>
                    <p>Order a delicious Pizza anytime. Pizzalicious is happy to assist you with your home delivery. Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. </p>
                    <ul class="socials">
                        <li><i class="bi bi-facebook"></i></li>
                        <li><i class="bi bi-twitter"></i></li>
                        <li><i class="bi bi-google"></i></li>
                        <li><i class="bi bi-youtube"></i></li>
                        <li><i class="bi bi-linkedin"></i></li>
                    </ul>
                    <p>copyright &copy;2022pizzalicious</p>
                </div>
            </footer>
        </div>
    )
}


export default Footer;