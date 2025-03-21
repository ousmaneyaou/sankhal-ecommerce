import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiServices";
import '../../styles/login.css'


const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("L'utilisateur s'est connecté avec succès");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate("/profile")
                }, 4000)
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Impossible d'ouvrir une session pour un utilisateur");
        }
    }

    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                    
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />

                    <button type="submit">Login</button>
                    
                    <p className="register-link">
                    Vous n'avez pas de compte ? <a href="/register">Register</a>
                    </p>
            </form>
        </div>
    )
}

export default LoginPage;