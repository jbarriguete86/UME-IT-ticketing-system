import React, {useState, useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { signIn, logOut } from "../configuration.js";

import styles from "../App.module.css"


export default function Login(){
    const [signed, setSigned]= useState(false)
    const [userName, setUserName]= useState("")
    const location = useLocation()
    const navigate = useNavigate()
    
    const from = location.state?.from || "/";

    useEffect(()=>{
        setUserName(localStorage.getItem("authenticatedUser"))
    },[])

    useEffect(()=>{
        setSigned(prevStat => !prevStat)
    },[userName])

    async function handleClick(){
        if (!userName){
            await signIn()
            navigate(from, { replace: true });
        } else {
            logOut()
            setUserName("")
        }
    }
    
      const display = userName ? 
      (<>
        <p>Welcome {userName}</p>
        <p>You can use the ticketing system now</p>
      </>
        
    )
    :
    (<p>You need to sign in first</p>)

    return (
        <div className="login-container">
            {display}
            <button onClick={handleClick}>{userName ? "sign out the app" : "Sign in with google"}</button>
        </div>
    )
    
}