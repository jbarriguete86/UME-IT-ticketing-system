import React, {useState, useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { signIn,logIn, logOut, auth } from "../configuration.js";
import { signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { UpdateInfo } from "../components/UpdateInfo";
import styles from "../App.module.css" 


export default function Login(){
    const [formData, setFormData]=useState({
        email:"",
        password:""
    })
    const [needToUpdate, setNeedToUpdate]= useState(false)
    const [wrongInfo, setWrongInfo] = useState(false)
    const [signed, setSigned]= useState(false)
    const [userName, setUserName]= useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    
    const from = location.state?.from || "/";


    console.log(needToUpdate)

    useEffect(()=>{
       
        const logIn = onAuthStateChanged(auth, (user) => {
           if(user){
            setUserName(user.displayName)
            setSigned(true)
           } else {
            ssetSigned(false)
            
           }
        //    console.log("Header re-rendered")
        //    console.log(userName)
            
        });

        // Cleanup subscription on unmount
        return () => logIn();
    
}, [])

    useEffect(()=>{
        userName ? setSigned(true) : setSigned(false)
        console.log( `The username is: ${userName}`)
    },[userName])

    useEffect(()=>{
       if (signed){
        !userName.displayname && updateUserInfo()
       }
        
    }, [signed])


    async function handleLogIn(){
        if (!userName){
            if (formData.email !== "" && formData.password !== ""){
                await signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then ((userCredential)=>{
                    if(userCredential){
                        const user = userCredential.user
                        console.log(user)
                        setUserName(user)
                        // setTimeout(()=>{
                        //     logOut()
                        //     setUserName(null)
                        //     }, 1000)
                        // setSigned(true)
                        // navigate(from, { replace: true });
    
                    } else {
                        logOut()
                        setUserName(null)
                    }
                })

        }} else {
            logOut()
            setUserName("")
        }
        // console.log(userName)
        // logOut()
    }

    function updateUserInfo(){
         setNeedToUpdate(true)    
    }

    function signInR(){
        console.log(signIn)
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
      const display = !userName ? 
      (<div className={styles.login_message}>
            <div className={styles.sign_cont}>
                <label htmlFor="email">Enter your email</label>
                <input
                    type="email" 
                    name="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.sign_cont}>
                <label htmlFor="password">Enter your password</label>
                <input 
                    type="password"
                    name="password" 
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
      </div>
        
    )
    :
    (<p className={styles.sign_message}>You're already logged in</p>)

    return (
        <div className={styles.login_container}>
            {needToUpdate && <UpdateInfo onClick={()=>{updateUserInfo}}/>}
            {display}
            <div className={styles.button_cont}>
                <button onClick={handleLogIn}>{userName ? "Log out" : "Log in"}</button>
                <button onClick={signInR}>Sign up</button>
            </div>
        </div>
    )
    
}