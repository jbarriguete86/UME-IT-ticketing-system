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
    const [signed, setSigned]= useState(false)
    const [userName, setUserName]= useState(null)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    
    const from = location.state?.from || "/";



    useEffect(()=>{
       
        const unsubscribe  = onAuthStateChanged(auth, (user) => {
           if(user){
            setUserName(user.email)
            setSigned(true)
            localStorage.setItem("authenticatedUser", userName)
            if (location.pathname === "/ticket") {
                navigate(from, { replace: true });
              }
           } else {
            setSigned(false)
            setUserName(null)
            localStorage.removeItem("authenticatedUser")
            
           }
            
        })

        return () => unsubscribe ()
    
}, [navigate, from, location.pathname])

    useEffect(()=>{
        userName ? setSigned(true) : setSigned(false)
    },[userName])



    async function handleLogIn(){
        if (!signed){
            if (formData.email !== "" && formData.password !== ""){
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
                    const user= userCredential.user
                    setUserName(user.displayName)
                    setSigned(true)
                    setError('')
                    navigate(from, { replace: true })
                    
                    } catch(error){
                        if(error.code === 'auth/invalid-credential'){
                           setError('Wrong email or password, try again') 
                        }
                        
                    }
                }  
                }else {
                    await logOut()
                    setUserName(null)
                    setSigned(false)
                }
            }

        

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function togglePasswordVisibility() {
        setShowPassword(prevShowPassword => !prevShowPassword);
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
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                     className={`${styles.view_password_button} ${showPassword ? styles.show : styles.hide}`}
                >
                </button>
            </div>
      </div>
        
    )
    :
    (<p className={styles.sign_message}>You're already logged in</p>)

    return (
        <div className={styles.login_container}>
            {error && (<p>{error}</p>)}
            {display}
            <div className={styles.button_cont}>
                <button onClick={handleLogIn}>{userName ? "Log out" : "Log in"}</button>
                <button onClick={()=>{console.log("please sign up")}}>Sign up</button>
            </div>
        </div>
    )
    
}