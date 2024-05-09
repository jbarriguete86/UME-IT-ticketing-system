import React, {useEffect, useState} from "react"
import styles from "./components.module.css"


export default function NewTicket({onClick}){
 console.log(onClick)
    return (
        <div className={styles.new_ticket_container}>
            <p onClick={onClick}>X</p>
            <div className={styles.inner_container}>
                <p>This is going to be where we're going to have the different field for the new ticket creation</p>
            </div>

        </div>
    )
}