import React, {useEffect, useState} from "react"
import styles from "../App.module.css"
import {getTickets} from "../configuration.js"
import {sortTicketsByDate} from "../utilities.js"
import NewTicket from "../components/NewTicket.jsx"
import Ticket from "../components/Ticket"

export default function Tickets(){
    const [ticketsDat, setTicketsDat] = useState([])
    const [formData, setFormData]=useState({
        filter:"",
        category:"",
        ticket:"",
        campus:""
    })
    const [newTicket, setNewTicket]=useState(false)
    const [openTicket, setOpenTicket]=useState(false)
    const [ticketNumber, setTicketNumber]=useState("")
    

    useEffect(()=>{
        fetchTickets()
    },[])

    useEffect(()=>{
        if(ticketsDat.length){
            console.log(ticketsDat)
        }
    },[ticketsDat])
    
    async function fetchTickets(){
        const newTickets = await getTickets()
        const sortedTickets = sortTicketsByDate(newTickets)
        setTicketsDat(sortedTickets)
    }


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleOpen(id){

        setOpenTicket(prevState=>!prevState)
        if(!ticketNumber){
            setTicketNumber(id)
        } else {
            setTicketNumber("")
            fetchTickets()
        }

    }

    function createNewTicket(){
        setNewTicket(prevState=>!prevState)
    }
    
    
    const openTickets=ticketsDat && ticketsDat.map(element=> {
        const {id, category, isSolved, location, personAssigned, personReporting, createdOn, dateClosed} = element
        return !isSolved && (
            <div key={id} className={styles.ticket}>
                <p className={styles.view_btn} onClick={()=>handleOpen(id)}>view </p>
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
        )})

        const closedTickets=ticketsDat && ticketsDat.map(element=> {
            const {id, category, isSolved, location, personAssigned, personReporting, createdOn, dateClosed} = element
            return isSolved && (
                <div key={id} className={styles.ticket}>
                    <p className={styles.view_btn} onClick={()=>handleOpen(id)}>view </p>
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
            )})
    

    return (
        <div className={styles.tickets_main}>
            {openTicket && <Ticket id={ticketNumber} handleClose={()=>{handleOpen()}}/>}
            {newTicket && <NewTicket onClick={()=>createNewTicket()} newFetch ={()=>fetchTickets()}/>}
            <div className={styles.tickets_selectors}>
                <select
                id="filter"
                value={formData.filter}
                onChange={handleChange}
                name="filter"
                >
                    <option value="">Filter by status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>

                <select
                id="filter"
                value={formData.category}
                onChange={handleChange}
                name="category"
                >
                    <option value="">Filter by category</option>
                    <option value="printer">Printer</option>
                    <option value="projector">Projector</option>
                    <option value="computer">Computer/Laptops</option>
                    <option value="chromebook">Chromebook</option>
                    <option value="other">Other</option>
                </select>

                <select
                id="filter"
                value={formData.campus}
                onChange={handleChange}
                name="campus"
                >
                    <option value="">Filter by campus</option>
                    <option value="duncanville">Duncanville</option>
                    <option value="mansfield">Mansfield</option>
                    <option value="dallasElementary">Dallas Elementary</option>
                    <option value="dallasHighschool">Dallas Highschool</option>
                    <option value="dallasJuniorHigh">Dallas Junior High</option>
                </select>


                <input
                type="text"
                placeholder="person who created the ticket"
                name="ticket"
                value={formData.ticket}
                onChange={handleChange}
                />
                <button className={styles.create_btn} onClick={setNewTicket}>Create new</button>
            </div>
            <div className={styles.tickets_container}>
                <p>Open Tickets</p>
                <div className={styles.tickets_title}>
                    <p></p>
                    <p>Created by</p>
                    <p>Campus</p>
                    <p>Category</p>
                    <p>Assigned to</p>
                    <p>Status</p>
                    <p>Created on</p>
                    <p>Closed on</p>
                </div>
                <div className={styles.tickets}>
                    {ticketsDat && openTickets}
                </div>
            </div>
            <hr />
            <div className={styles.tickets_container}>
                <p>Closed Tickets</p>
                <div className={styles.tickets_title}>
                    <p></p>
                    <p>Created by</p>
                    <p>Campus</p>
                    <p>Category</p>
                    <p>Assigned to</p>
                    <p>Status</p>
                    <p>Created on</p>
                    <p>Closed on</p>
                </div>
                <div className={styles.tickets}>
                    {ticketsDat && closedTickets}
                </div>
            </div>
        </div>
    )
}