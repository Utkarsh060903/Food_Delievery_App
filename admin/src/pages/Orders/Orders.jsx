import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  const [orders , setOrders] = useState([])
  
  const fetchAllOrders = async() => {
    const response = await axios.get(url+'/api/order/list')
    if(response.data.success){
      setOrders(response.data.data)

    }
    else{
      toast.error("error")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  } , [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index) => {
                  if(index === order.items.length-1){
                    return item.name + " x " + item.quantity
                  }
                  else{
                    return item.name + " x " + item.quantity + " , "
                  }
                })}
              </p>
              <p className="order-tem-name">{order.address.firstName+" "+order.address.lastName}</p>
              <p className="order-item-address">
                <p>{order.address.street+' , '}</p>
                <p>{order.address.city+' , '}</p>
                <p>{order.address.state+' , '}</p>
                <p>{order.address.country+' , '}</p>
                <p>{order.address.zipcode+' , '}</p>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders