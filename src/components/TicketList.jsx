import React from "react"
import styles from "./components.module.css"

export  default function TicketList({tickets, onOpenTickets}){
    return (
        <div className={styles.tickets}>
            {tickets.map(ticket=>{
                const {id, category, isSolved, location, personAssigned, personReporting, createdOn, dateClosed } = ticket
                return (
                <div key={id} className={styles.ticket}>
                    <p className={styles.view_btn} onClick={()=>onOpenTickets(id)}>view </p>
                    <p>{personReporting}</p>
                    <p>{location === "dallasHighschool" ? "Dallas Highschool" 
                    : 
                    location === "dallasJuniorHigh" ? "Dallas Junior High" 
                    : 
                    location === "dallasElementary" ? "Dallas Elementary"
                    :
                    location === "duncanville" ? "Duncanville" : "Mansfield"
                    }</p>
                    <p>{category}</p>
                    <p>{personAssigned !== "" ? personAssigned : "unassigned"}</p>
                    <p>{isSolved ? "closed" : "Open"}</p>
                    <p>{createdOn}</p>
                    <p>{isSolved ? dateClosed : "---"}</p>
                </div>
                )
            })}

        </div>
        
    )

}