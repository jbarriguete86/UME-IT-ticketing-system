import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import styles from "./components.module.css"
import { dat } from "../configuration.js"

export default function Ticket(){
    const [data, setData]=useState()
    const [formData, setFormData]= useState ({
        status:"",
        assigned:"",
        category:"",
        campus:""

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
        const comment = e.value
        console.log(comment)
        setComment(prevComments => [...prevComments, {user: user, comment: comment}])
        e.value= ""


    }

    console.log(comment)

    return data && (
        <div className={styles.ticket_container}>
                    <div>
                        <p>Person reporting the ticket</p>
                        <p>{data.personReporting}</p>
                    </div>
                    <div>
                        <p>Describe the problem</p>
                        <p>{data.description}</p>
                    </div>
                    <div>
                        <label htmlFor="status">Select the status of the ticket</label>
                        <select
                        id="status"
                        value={FormData.status}
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
                        value={FormData.category}
                        name="category"
                        onChange={handleChange}
                        >
                            <option value="">Select the category</option>
                            <option value="printer">Printer</option>
                            <option value="chromebook">Chromebook</option>
                            <option value="computer">Computer/laptop</option>
                            <option value="projector">Chromebook</option>
                            <option value="other">Other</option>
                        </select>

                        <label htmlFor="campus">Select the campus</label>
                        <select
                        id="campus"
                        value={FormData.campus}
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
                    </div>
                    <div>
                        <p>Comments</p>
                        <textarea name="comment" id="comment"></textarea>
                        <button className={styles.submitComment} onClick={submitComment}>Enter comment</button>
                    </div>
                    <button className={styles.submit_btn}>Submit</button>
                </div>
    )
}