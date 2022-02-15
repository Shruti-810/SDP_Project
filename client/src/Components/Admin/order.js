import React from 'react';
import './order.css'

let Order =()=>{
    return(
        <div>
            <table className='table'>
                <tr className='tr-first' id='th'>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Orders</th>
                    <th>Status</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>Avinash</td>
                    <td>Vadodara</td>
                    <td>Margherita</td>
                    <td>Pending</td>
                    <td>219</td>
                </tr>
                <tr>
                    <td>Avinash</td>
                    <td>Vadodara</td>
                    <td>Margherita</td>
                    <td>Pending</td>
                    <td>219</td>
                </tr>
                <tr>
                    <td>Avinash</td>
                    <td>Vadodara</td>
                    <td>Margherita</td>
                    <td>Pending</td>
                    <td>219</td>
                </tr>
            </table>
        </div>
    )
}


export default Order