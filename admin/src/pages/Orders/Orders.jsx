// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { assets } from '../../assets/assets'

// const Orders = ({url}) => {

//   const [orders , setOrders] = useState([])
  
//   const fetchAllOrders = async() => {
//     const response = await axios.get(url+'/api/order/list')
//     if(response.data.success){
//       setOrders(response.data.data)

//     }
//     else{
//       toast.error("error")
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders()
//   } , [])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order,index) => (
//           <div key={index} className='order-item'>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item,index) => {
//                   if(index === order.items.length-1){
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + " , "
//                   }
//                 })}
//               </p>
//               <p className="order-tem-name">{order.address.firstName+" "+order.address.lastName}</p>
//               <p className="order-item-address">
//                 <p>{order.address.street+' , '}</p>
//                 <p>{order.address.city+' , '}</p>
//                 <p>{order.address.state+' , '}</p>
//                 <p>{order.address.country+' , '}</p>
//                 <p>{order.address.zipcode+' , '}</p>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders



import React, { useState, useEffect } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list')
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error fetching orders")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className='order-item-food'>
                  {Array.isArray(order.items) && order.items.map((item, itemIndex) => (
                    itemIndex === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  ))}
                </p>
                <p className="order-item-name">{`${order.address.firstName} ${order.address.lastName}`}</p>
                <div className="order-item-address">
                  <p>{`${order.address.street}, `}</p>
                  <p>{`${order.address.city}, `}</p>
                  <p>{`${order.address.state}, `}</p>
                  <p>{`${order.address.country}, `}</p>
                  <p>{`${order.address.zipcode}`}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  )
}

export default Orders
