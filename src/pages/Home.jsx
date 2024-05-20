import React, { useEffect, useState} from "react"
import styles from "../App.module.css"
import {getTickets} from "../configuration.js"


export default function Home(){
    
    const [data, setData]= useState([])
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
        const assignedTickets= data.filter(element => element.personAssigned)
        const openTickets = data.filter(element => !element.isSolved) 

        setTicketsInfo({
            assigned:assignedTickets.length,
            solved:solvedTickets.length,
            open: openTickets.length,
            total:data.length 
        })
    },[data])


    return (
        <div className={styles.home_container}>
            <h2>Welcome to the UME IT ticketing system</h2>
            {data.length ? (
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
            </div>
            ) : 
            (<p className={styles.unauth_message}>This is the IT Ticketing system, to get access to this system contact: <a href="mailto:it.director@umeprep.org?subject=I want access to this app">Jose Barriguete</a></p>)}
            

        </div>
    )
}