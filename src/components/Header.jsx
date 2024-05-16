import React, {useState, useEffect} from "react"
import { NavLink } from "react-router-dom"
import { auth} from "../configuration.js"
import {onAuthStateChanged } from "firebase/auth"
import umeLogo from "../assets/UMELogoTransparent.png"
import styles from "./components.module.css"

export default function Header(){
    const [loggedIn, setLoggedIn]= useState(false)
    const [userName, setUserName]= useState("")

    

    useEffect(()=>{
       
            const logIn = onAuthStateChanged(auth, (user) => {
               if(user){
                setLoggedIn(true)
               } else {
                setLoggedIn(false)
                
               }
            //    console.log("Header re-rendered")
            //    console.log(userName)
                
            });
    
            // Cleanup subscription on unmount
            return () => logIn();
        
    }, [])

    useEffect(()=>{
        loggedIn ? setUserName(JSON.parse(localStorage.getItem("authenticatedUser"))) : setUserName("")
    }, [loggedIn])

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    // console.log(loggedIn)


    return (
        <header>
            <div className={styles.logo_container}>
                <img src={umeLogo} alt="logo of UME Preparatory Academy"/>
                <p>IT Ticketing System</p>
            </div>
            <p>Welcome <span>{userName && userName}</span></p>
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

                <NavLink 
                to ="/login"
                style={({ isActive }) => isActive ? activeStyles : null}
                >
                {loggedIn ? "Log out" : "Login"}
                </NavLink>

            </nav>
        </header>
    )
}