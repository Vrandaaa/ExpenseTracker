import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { FaBars, FaEdit, FaHome, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';
const NavBar = () => {
    const navigate = useNavigate();
    const [showNavBar, setNavBar] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const { logout } = useContext(AuthContext)
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setProfileImage(imageUrl);
        }
    }

    return (
        <div className={showNavBar ? 'NavbarContainer collapsed' : 'NavbarContainer'}>
            <span className='FaBars'><FaBars size={24} onClick={() => { setNavBar(!showNavBar) }} className='bars' /></span>
            <div className='profileSection'>
                <div className='profileImg'>

                    <img
                        src={profileImage || "https://ui-avatars.com/api/?name=Vranda+Rastogi"}
                        alt=""
                    />
                    <input
                        type="file"
                        id="profileInput"
                        hidden
                        accept='image/*'
                        onChange={handleImageChange}
                    />

                </div>
                <label htmlFor='profileInput'>
                    <FaEdit className='editIcon' size={20} />
                </label>
                <div className='Name'>Vranda Rastogi</div>

            </div>
            <div className='links'>
                <ul>
                    <li>
                        <NavLink to="/home">
                            <FaHome className='navIcon' />
                            {/* {showNavBar && <span>Home</span>} */}
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/income">
                            <FaWallet className='navIcon' />
                            {/* {showNavBar && <span>Income</span>} */}
                            <span>Income</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/expense">
                            <FaMoneyBillWave className='navIcon' />
                            {/* {showNavBar && <span>Expense</span>} */}
                            <span>Expense</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='logout'><button onClick={() => {
                logout();
                navigate("/");
            }}>LogOut</button></div>
        </div>
    )
}

export default NavBar;