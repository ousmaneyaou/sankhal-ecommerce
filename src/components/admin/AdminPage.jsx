import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminPage.css'


const AdminPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <button onClick={()=> navigate("/admin/categories")}>Gérer les catégories</button>
            <button onClick={()=> navigate("/admin/products")}>Gérer les produits</button>
            <button onClick={()=> navigate("/admin/orders")}>Gérer les commandes</button>
        </div>
    )
}

export default AdminPage;