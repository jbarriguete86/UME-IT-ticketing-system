import React, {useState, useEffect} from "react"
import { Outlet, Navigate, useLocation} from "react-router-dom"

export default function AuthRequired(){
    const user = localStorage.getItem("authenticatedUser")
    const location = useLocation()

    if (!user){
        return (
        <Navigate 
        to="/login" 
        state={{
            message: "You must log in first",
            from: location.pathname
        }} 
        replace
        />)
    } 
    return <Outlet/>
}
