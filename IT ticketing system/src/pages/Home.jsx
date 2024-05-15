import React, { useEffect, useState} from "react"
import styles from "../App.module.css"
import { logOut } from "../configuration.js"
import {getTickets} from "../configuration.js"


export default function Home(){
    const [data, setData]= useState([])
    const [signed, setSigned] = useState(localStorage.getItem("authenticatedUser") !== null)
    const [ticketsInfo, setTicketsInfo]=useState({
        assigned:0,
        solved:0,
        open: 0,
        total:0
    })


    useEffect(()=>{
            async function fetchTickets(){
                const newTickets = await getTickets()
                setData(newTickets)
            }
             
    
            fetchTickets()

    },[])
   
    useEffect(()=>{

        const solvedTickets= data.filter(element => element.isSolved)
        const assignedTickets= data.filter(element => element.isAssigned)
        const openTickets = data.filter(element => !element.isSolved) 

        setTicketsInfo({
            assigned:assignedTickets.length,
            solved:solvedTickets.length,
            open: openTickets.length,
            total:data.length 
        })
    },[data])

    function handleClick(){
        signed ? logOut() : console.log("sign in")

    }

    return (
        <div className={styles.home_container}>
            <button onClick={handleClick}>{signed ? "Log Out": "Sign in"}</button>
            <h2>Welcome to the UME IT ticketing system</h2>
            <div className={styles.home_wrapper}>
                <div className={styles.ticket_type_container}>
                    <p>Unassigned tickets</p>
                    <p>{ticketsInfo.total - ticketsInfo.assigned}</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Solved tickets</p>
                    <p>{ticketsInfo.solved}</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Open tickets</p>
                    <p>{ticketsInfo.open}</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Total tickets</p>
                    <p>{ticketsInfo.total}</p>
                </div>
                    
                <div key="chartContainer" className={styles.chart_container}>

                </div>
            </div>

        </div>
    )
}