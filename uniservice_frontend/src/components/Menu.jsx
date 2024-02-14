import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'


const Menu = () => {
    return (
        <>
            <div className="menu_bar">
                <Link to={"/home"}>
                    <img src="images/logo.png" alt="logo" />
                </Link>
                <div className="menu_tabs">

                    <p></p>
                    <p>Contact</p>
                    <p>FAQ</p>


                    <div className="user">
                        <img src="svg/user_icon.svg" alt="" />
                        <p>{localStorage.getItem('username')}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Menu