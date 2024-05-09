import React, {useState, useEffect} from "react"
import { useParams, NavLink } from "react-router-dom"
import styles from "./components.module.css"
import { dat } from "../configuration.js"


export default function Ticket(){
    const [data, setData]=useState()
    const [formData, setFormData]= useState ({
        status:"",
        assigned:"",
        category:"",
        campus:"",
        comment:""

    })
    const [comment, setComment]=useState([])
    const {id} = useParams()



    useEffect(()=>{
        setData(dat.find(element => element.id == id))
    },[id])

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function submitComment(e){
        e.preventDefault()
        const user= "Jose Barriguete Ramos"
        setComment(prevComments => [...prevComments, {user: user, comment: formData.comment}])
        setFormData(prevFormData=>({
            ...prevFormData,
            comment:""
        }))
    }

    

    function getLocationName(location) {
        const locationMap = {
            dallasHighschool: "Dallas Highschool",
            dallasJuniorHigh: "Dallas Junior High",
            dallasElementary: "Dallas Elementary",
            duncanville: "Duncanville",
            mansfield: "Mansfield"
        };
        return locationMap[location] || "Unknown";
    }

    const commentsEl = data && data.comments.map(element=>{
        return (
            <div key={element.key} className={styles.comment_container}>
                <div>
                    <h3>User</h3>
                    <p>{element.user}</p>
                </div>
                <div>
                    <h3>Comment</h3>
                    <p>{element.comment}</p>
                </div>
                <p><span>Submitted on: </span>{element.date}</p>
            </div>
        )
    })


    return data && (
        <div className={styles.ticket_section}>
                <NavLink to="/tickets">Go back</NavLink>
                <div className={styles.ticket_editing}>
                        <label htmlFor="status">Select the status of the ticket</label>
                        <select
                        id="status"
                        value={formData.status}
                        name="status"
                        onChange={handleChange}
                        >
                            <option value="">Select status</option>
                            <option value="open">Open</option>
                            <option value="closed">Close</option>
                        </select>

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

                        <label htmlFor="campus">Select the campus</label>
                        <select
                        id="campus"
                        value={formData.campus}
                        name="campus"
                        onChange={handleChange}
                        >
                            <option value="">Select the campus</option>
                            <option value="dallasHighschool">Dallas Highschool</option>
                            <option value="dallasJuniorhigh">Dallas Junior High</option>
                            <option value="dallasElementary">Dallas Elementary</option>
                            <option value="duncanville">Duncanville</option>
                            <option value="mansfield">Mansfield</option>
                        </select>

                        <label htmlFor="assigned">Modify who is assigned to this ticket</label>
                        <select
                        id="assigned"
                        value={formData.assigned}
                        name="assigned"
                        onChange={handleChange}
                        >
                            <option value="">Select user</option>
                            <option value="Jose Barriguete">Jose Barriguete</option>
                            <option value="Landy Williams">Landy Williams</option>
                        </select>
                    </div>
                    
                    <div className={styles.ticket_info}>
                        <p>Person reporting the ticket |</p>
                        <p>{data.personReporting}</p>
                    </div>
                    <div className={styles.ticket_info}>
                        <p>Describe the problem |</p>
                        <p>{data.description}</p>
                    </div>
            
                    <div className={`${styles.ticket_info} ${styles.centered}`}>
                        <div>
                            <p>STATUS</p>
                            <p>{data.isSolved ? "Closed" : "Pending"}</p>
                        </div>

                        <div>
                            <p>CAMPUS</p>
                            <p>{getLocationName(data.location)}</p>
                        </div>
                        <div>
                            <p>ROOM #</p>
                            <p>{data.room ? data.room : "Missing information"}</p>
                        </div>
                        <div>
                            <p>Category</p>
                            <p>{data.category}</p>
                        </div>
                        <div>
                            <p>Assigned to:</p>
                            <p>{data.isAssigned ? data.personAssigned : "unassigned"}</p>
                        </div>
                    </div>
                    <div className={styles.comments_container}>
                        {data.comments.length > 0 ? commentsEl : "No comments yet"}
                    </div>
                    <div className={styles.comment_section}>
                        <hr/>
                        <p>Comments</p>
                        <div className={styles.comment_section_inner}>
                            <textarea 
                            name="comment" 
                            id="comment"
                            value={formData.comment}
                            onChange={handleChange}/>
                            <button className={styles.submitComment} onClick={submitComment}>Enter comment</button>
                        </div>
                    </div>
                    
                    <button className={styles.submit_btn}>Submit</button>
                    
                </div>
    )
}