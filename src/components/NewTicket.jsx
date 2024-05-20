import React, {useEffect, useState} from "react"
import {createNewTicket} from "../configuration.js"
import { formattedDate, timeStamp} from "../utilities.js"
import styles from "./components.module.css"


export default function NewTicket({onClick, newFetch}){
    const [formData, setFormData] = useState({
        description: "",
        personReporting: "",
        location:"",
        room:"",
        category:"",
        personAssigned:"",
        isSolved: false,
        dateClosed:"",
        createdOn:formattedDate(),
        timeStamp:timeStamp(),
        comments:[]
    })

 
    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            }))
        
    }

    async function handleSubmit(){
        
        const requiredFields = ["description", "personReporting", "location", "room", "category"]
        const status = requiredFields.filter(field => formData[field] === "")

        if(!status.length) {
            await createNewTicket(formData)
            setFormData({
                description: "",
                personReporting: "",
                location:"",
                room:"",
                category:"",
                isAssigned: false,
                personAssigned:"",
                isSolved: false,
                createdOn: "",
                dateClosed:"",
                comments:[]
            })
            newFetch()
            onClick()
        }
    }
    
    return (
        <div className={styles.new_ticket_container}>
            <p className={styles.close_new} onClick={onClick}>X</p>
            <div className={styles.inner_container}>
                <div>
                    <label htmlFor="reportingParty">Who submitted the ticket: </label>
                    <textarea 
                                name="personReporting" 
                                id="reportingParty"
                                value={formData.personReporting}
                                onChange={handleChange}/>
                </div>
                
                <div>
                    <label htmlFor="description">Describe the problem: </label>
                    <textarea 
                                name="description" 
                                id="description"
                                value={formData.description}
                                onChange={handleChange}/>
                </div>
                
                <div>
                    <label htmlFor="category">Select the category of the ticket</label>
                    <select
                    id="category"
                    value={formData.category}
                    name="category"
                    onChange={handleChange}
                    >
                            <option value="">Select the category</option>
                            <option value="printer">Printer</option>
                            <option value="chromebook">Chromebook</option>
                            <option value="computer">Computer/laptop</option>
                            <option value="projector">Projector</option>
                            <option value="other">Other</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="location">Select the campus: </label>
                    <select 
                    name="location" 
                    id="location"
                    value={formData.location}
                    onChange={handleChange}>
                    <option value="">Select the campus</option>
                            <option value="dallasHighschool">Dallas Highschool</option>
                            <option value="dallasJuniorhigh">Dallas Junior High</option>
                            <option value="dallasElementary">Dallas Elementary</option>
                            <option value="duncanville">Duncanville</option>
                            <option value="mansfield">Mansfield</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="room">Enter the room #: </label>
                    <textarea 
                                name="room" 
                                id="room"
                                value={formData.room}
                                onChange={handleChange}/>
                </div>
            </div>
            
            <button onClick={handleSubmit} className={styles.submit_new_btn}>Submit ticket</button>

        </div>
    )
}