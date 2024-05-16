import React, {useEffect, useState} from "react";
import styles from "./components.module.css"
import { auth } from "../configuration.js";
import { updateProfile } from "firebase/auth";

export function UpdateInfo({onClick}){
    
    const [formData, setFormData] = useState({
        name: "",
    })

    console.log(onClick)
    
    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            }))
        
    }
    
    async function handleSubmit(){
        await updateProfile(auth.currentUser, {
            displayName: formData.name})
            .then(() => {
            onClick()
          }).catch((error) => {
            console.log(error)
          })
    }
    
    return (
        <div className={styles.info_container}>
                <div>
                    <label htmlFor="name">What is your name: </label>
                    <input 
                        type="text"
                        name="name" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}/>
                </div>
                    
            <button onClick={handleSubmit} className={styles.submit_new_btn}>Submit</button>
    
        </div>
    )
}
