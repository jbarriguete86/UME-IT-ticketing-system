import React, {useState, useEffect} from "react"
import { NavLink } from "react-router-dom"
import umeLogo from "../assets/UMELogoTransparent.png"
import styles from "./components.module.css"

export default function Header(){
 

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }


    return (
        <header>
            <div className={styles.logo_container}>
                <img src={umeLogo} alt="logo of UME Preparatory Academy"/>
                <p>IT Ticketing System</p>
            </div>
            <nav>
                <NavLink to="."
                end
                style={({ isActive }) => isActive ? activeStyles : null}

                >
                    Home
                </NavLink>

                <NavLink 
                to="/tickets"
                style={({ isActive }) => isActive ? activeStyles : null}
                > 
                Tickets
                </NavLink>


            </nav>
        </header>
    )
}