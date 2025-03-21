import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiServices";
import '../../styles/address.css';

const AddressPage = () => {

    const [address, setAddress] = useState({
        street: '',
        city: '',
        region: '',
        zipCode: '',
        country: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {

        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }
    }, [location.pathname]);


    const fetchUserInfo = async()=>{
        try {
            const response = await ApiService.userInfos();
            if (response.user.address) {
                setAddress(response.user.address)
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Impossible d'obtenir des informations sur l'utilisateur")
        }
    } ;

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    }

    const handSubmit = async (e) =>{
        e.preventDefault();
        try {
            await ApiService.saveAddress(address);
            navigate("/profile")
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Échec de la sauvegarde/mise à jour de l'adresse")
        }
    }


    return(
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : "Add Addresss"}</h2>
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handSubmit}>
                <label>
                    Street:
                    <input type="text"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    required/>
                </label>
                <label>
                    City:
                    <input type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required/>
                </label>
                <label>
                    Region:
                    <input type="text"
                    name="state"
                    value={address.region}
                    onChange={handleChange}
                    required/>
                </label>

                <label>
                    Zip Code:
                    <input type="text"
                    name="zipcode"
                    value={address.zipCode}
                    onChange={handleChange}
                    required/>
                </label>

                <label>
                    Country:
                    <input type="text"
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    required/>
                </label>
                <button type="submit">{location.pathname === '/edit-address' ? 'Edit Address' : "Save Addresss"}</button>

            </form>
        </div>
    )
}

export default AddressPage;