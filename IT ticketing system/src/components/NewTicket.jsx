import React, {useEffect, useState} from "react"
import styles from "./components.module.css"


export default function NewTicket({onClick}){
    const [formData, setFormData] = useState({
        id:"",
        description: "",
        personReporting: "",
        location:"",
        room:"",
        category:"",
        isAssigned: false,
        personAssigned:"",
        isSolved: false,
        dateClosed:"",
        comments:[]
    })
 
    function handleChange(){
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            }))
        
    }

    console.log(formData)

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
            
            <button className={styles.submit_new_btn}>Submit ticket</button>

        </div>
    )
}