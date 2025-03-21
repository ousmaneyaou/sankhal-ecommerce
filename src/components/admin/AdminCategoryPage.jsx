import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiServices";
import { useNavigate } from "react-router-dom";
import '../../styles/adminCategory.css'

const AdminCategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        fetchCategories();
    }, [])

    const fetchCategories = async()=>{
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            console.log("Erreur dans l'extraction de la liste des catégories",  error)
        }
    }

    const handleEdit = async (id) => {
        navigate(`/admin/edit-category/${id}`)
    }
    const handleDelete = async(id) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?? ")
        if(confirmed){
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.log("Erreur lors de la suppression d'une catégorie par son identifiant")
            }
        }
    }

    return(
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>Categories</h2>
                <button onClick={()=> navigate('/admin/add-category')}>Ajouter une catégorie</button>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                            <div className="admin-bt">
                                    <button className="admin-btn-edit" onClick={()=> handleEdit(category.id)}>Edit</button>
                                    <button  onClick={()=> handleDelete(category.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminCategoryPage;