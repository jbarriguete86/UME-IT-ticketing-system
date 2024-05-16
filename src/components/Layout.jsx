import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import styles from "./components.module.css"

export default function Layout(){
    
    useEffect(()=>{
        console.log("layout re-rendered")
    },[])
 return (
    <div className={styles.site_wrapper}>
        <Header/>
        <main>
            <Outlet/>
        </main>
    </div>
 )
}