import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]); // ✅ FIX: Use array instead of {}

    const fetchMyOrder = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            console.log(email);

            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) throw new Error("Failed to fetch orders");
            
            const data = await response.json();
            setOrderData(data.orderData || []); // ✅ FIX: Use `orderData` key directly
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData?.order_data?.slice(0).reverse().map((item, index) => (
                            <div key={index}>
                                {item.map((arrayData, i) => (
                                    <div key={i}>
                                        {arrayData.Order_date ? (
                                            <div className='m-auto mt-5'>
                                                <strong>Order Date: {arrayData.Order_date}</strong>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>Qty: {arrayData.qty}</span>
                                                            <span className='m-1'>Size: {arrayData.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center mt-5">No Orders Found</h4>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
