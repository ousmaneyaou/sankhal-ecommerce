import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/addCategory.css'

const EditCategory = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.category.name);

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Échec de l'obtention d'une catégorie par identifiant")
            setTimeout(() => {
                setMessage('');
            }, 3000)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.updateCategory(categoryId, { name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories")
                }, 3000)
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Échec de l'enregistrement d'une catégorie")
        }
    }

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Edit Category</h2>
                <input type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <button type="submit">Update</button>
            </form>
        </div>
    )

}

export default EditCategory;