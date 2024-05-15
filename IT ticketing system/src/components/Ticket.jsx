import React, {useState, useEffect} from "react"
import { nanoid } from "nanoid"
import { useParams, NavLink } from "react-router-dom"
import styles from "./components.module.css"
import { getTicketById, addComment, updateTicket} from "../configuration.js"
import  {formatDate, getLocationName}  from "../utilities.js"


export default function Ticket(){
    const [data, setData]=useState()
    const [formData, setFormData]= useState ({
        isSolved:false,
        personAssigned:"",
        category:"",
        location:""
    })
    const [comments, setComments]=useState([])
    const {id} = useParams()



    useEffect(()=>{
        async function fetchTicket(ticketId){
            const ticketInfo = await getTicketById(ticketId)
            setData(ticketInfo)
        }
        fetchTicket(id)
        
    },[id])

    useEffect(()=>{
       setComments(getComments())
       data && setFormData(prevFormData=>({
        ...prevFormData,
        isSolved: data.isSolved
       }))
    }, [data])



    function handleChange(event) {
        const { name, value } = event.target;
        const valueToSet = name === "isSolved" ? (value === "true") : value

        setFormData(prevState => ({
            ...prevState,
            [name]: valueToSet
        }))
    }

    async  function handleSubmit(){
        const toCompare = ["isSolved", "personAssigned", "category", "location"]
        const dataToChange = toCompare.reduce((acc, element) => {
            if (formData[element] !== "" && formData[element] !== data[element]) {
                acc[element] = formData[element];
            }
            return acc;
        }, {})
        console.log(dataToChange)
        if (Object.keys(dataToChange).length > 0) {
            await updateTicket(id, dataToChange)
            const updatedTicket = await getTicketById(id)
            setData(updatedTicket)
            setFormData({
                isSolved: false,
                personAssigned: "",
                category: "",
                location: ""
            })
        }
        }
     
        // if (Object.keys(updatedKeys).length > 0){
        //     await updateTicket(id, updatedKeys)
        //     const updatedTicket = await getTicketById(id);
        //     setData(updatedTicket)
        //     setFormData({
        //         isSolved:false,
        //         personAssigned:"",
        //         category:"",
        //         location:""
        //     })
            
            
        // } 
    

    async function submitComment(e){
        e.preventDefault()
            const key = nanoid()
            const user= "Jose Barriguete Ramos"
            const comment = formData.comment
            const date = formatDate()

            if (!comment.trim()) {
                return;
              }
              const newComment = { key, user, comment, date }
        
              try {
                await addComment(id, newComment)
                const updatedTicket = await getTicketById(id)
                setData(updatedTicket)

            } catch (error) {
                console.error("Error adding comment:", error);
            }

    
            setFormData(prevFormData => ({
                ...prevFormData,
                comment: ""
            }))
    }

    function getComments(){
        if (!data || !data.comments) return "No comments yet"

        return data.comments.map(element=> (
            <div key={element.key ? element.key : `dfer${element.user}`} className={styles.comment_container}>
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
    )
    }


    return data && (
        <div className={styles.ticket_section}>
                <NavLink to="/tickets">Go back</NavLink>
                <div className={styles.ticket_editing}>
                        <label htmlFor="isSolved">Select the status of the ticket</label>
                        <select
                        id="isSolved"
                        value={formData.isSolved}
                        name="isSolved"
                        onChange={handleChange}
                        >
                            <option value={false}>Open</option>
                            <option value={true}>Close</option>
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

                        <label htmlFor="location">Select the campus</label>
                        <select
                        id="location"
                        value={formData.campus}
                        name="location"
                        onChange={handleChange}
                        >
                            <option value="">Select the campus</option>
                            <option value="dallasHighschool">Dallas Highschool</option>
                            <option value="dallasJuniorHigh">Dallas Junior High</option>
                            <option value="dallasElementary">Dallas Elementary</option>
                            <option value="duncanville">Duncanville</option>
                            <option value="mansfield">Mansfield</option>
                        </select>

                        <label htmlFor="personAssigned">Modify who is assigned to this ticket</label>
                        <select
                        id="personAssigned"
                        value={formData.personAssigned}
                        name="personAssigned"
                        onChange={handleChange}
                        >
                            <option value="">Select user</option>
                            <option value="Jose Barriguete">Jose Barriguete</option>
                            <option value="Landy Williams">Landy Williams</option>
                        </select>
                    </div>
                    <button className={styles.update_btn} onClick={handleSubmit}>Update Ticket</button>
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
                            <p>{data.isSolved ? "Closed" : "Open"}</p>
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
                            <p>{data.personAssigned !== "" ? data.personAssigned : "unassigned"}</p>
                        </div>
                    </div>
                    <div className={styles.comments_container}>
                        {comments.length ? comments : "No comments yet"}
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
                </div>
    )
}