import React, { useEffect, useState} from "react"
import styles from "../App.module.css"
import {dat} from "../configuration.js"

export default function Home(){
    const [data, setData]= useState([])


    useEffect(()=>{
        getData()
    },[dat])
    function getData(){
        setData(dat)
    }

    console.log(data)

    return (
        <div className={styles.home_container}>
            <h2>Welcome to the UME IT ticketing system</h2>
            <div className={styles.home_wrapper}>
                <div className={styles.ticket_type_container}>
                    <p>Unassigned tickets</p>
                    <p>4</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Solved tickets</p>
                    <p>5</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Open tickets</p>
                    <p>6</p>
                </div>
                    
                <div key="chartContainer" className={styles.chart_container}>

                </div>
            </div>

        </div>
    )
}