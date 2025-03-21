import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../styles/adminOrderDetails.css'
import ApiService from "../../service/ApiServices";


const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminOrderDetailsPage = () => {
    const { itemId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});


    useEffect(() => {
        fetchOrderDetails(itemId);
    }, [itemId]);

    const fetchOrderDetails = async (itemId) => {
        try {
            const response = await ApiService.getOrderItemById(itemId);
            setOrderItems(response.orderItemList)
        } catch (error) {
            console.log(error.message || error);
        }
    }

    const handleStatusChange = (orderItemId, newStatus) => {
        setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus })
    }

    const handleSubmitStatusChange = async (orderItemId) => {
        try {
            await ApiService.updateOrderitemStatus(orderItemId, selectedStatus[orderItemId]);
            setMessage('le statut du poste de commande a été mis à jour avec succès')
            setTimeout(() => {
                setMessage('');
            }, 3000)
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Impossible de mettre à jour le statut de l'article de la commande")
        }
    }


    return (
        <div className="order-details-page">
            {message && <div className="message">{message}</div>}
            <h2>Détails de la commande</h2>
            {orderItems.length ? (
                orderItems.map((orderItem) => (
                    <div key={orderItem.id} className="order-item-details">
                        <div className="info">
                            <h3>Informations sur les commandes</h3>
                            <p><strong>Order Item ID:</strong>{orderItem.id}</p>
                            <p><strong>Quantity:</strong>{orderItem.quantity}</p>
                            <p><strong>Total Price:</strong>{orderItem.price}</p>
                            <p><strong>Order Status:</strong>{orderItem.status}</p>
                            <p><strong>Date de la commande:</strong>{new Date(orderItem.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="info">
                            <h3>Informations sur l'utilisateur</h3>
                            <p><strong>Name:</strong>{orderItem.user.name}</p>
                            <p><strong>Email:</strong>{orderItem.user.email}</p>
                            <p><strong>Phone:</strong>{orderItem.user.phoneNumber}</p>
                            <p><strong>Role:</strong>{orderItem.user.role}</p>

                            <div className="info">
                                <h3>Adresse de livraison</h3>
                                <p><strong>Country:</strong>{orderItem.user.address?.country}</p>
                                <p><strong>Region:</strong>{orderItem.user.address?.region}</p>
                                <p><strong>City:</strong>{orderItem.user.address?.city}</p>
                                <p><strong>Street:</strong>{orderItem.user.address?.street}</p>
                                <p><strong>Zip Code:</strong>{orderItem.user.address?.zipcode}</p>
                            </div>
                        </div>
                        <div>
                            <h2>Informations sur le produit</h2>
                            <img src={orderItem.product.imageUrl} alt={orderItem.product.name} />
                            <p><strong>Name:</strong>{orderItem.product.name}</p>
                            <p><strong>Description:</strong>{orderItem.product.description}</p>
                            <p><strong>Price:</strong>{orderItem.product.price}</p>
                        </div>
                        <div className="status-change">
                            <h4>Changement d'état</h4>
                            <select
                                className="status-option"
                                value={selectedStatus[orderItem.id] || orderItem.status}
                                onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}>

                                {OrderStatus.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button className="update-status-button" onClick={() => handleSubmitStatusChange(orderItem.id)}>Mise à jour du statut</button>
                        </div>
                    </div>

                ))
            ) : (
                <p>Loading order details ....</p>
            )}
        </div>
    );

}

export default AdminOrderDetailsPage;