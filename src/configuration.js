
import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, updateDoc, addDoc, collection, getFirestore } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword   } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa3k_2b1ac5QohdYfSMuFv61hJO6qy39o",
  authDomain: "it-ticketing-system-a3ffe.firebaseapp.com",
  projectId: "it-ticketing-system-a3ffe",
  storageBucket: "it-ticketing-system-a3ffe.appspot.com",
  messagingSenderId: "101082453323",
  appId: "1:101082453323:web:4c2e656df7c4f774cac4ce",
  measurementId: "G-YETCFMJRGJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const ticketsRef= collection(db, "Tickets")


const getTickets = async () => {
    const querySnapshot = await getDocs(ticketsRef);
    let ticketsDb = [];
    querySnapshot.forEach((doc) => {
        ticketsDb.push({ id: doc.id, ...doc.data() });
    });
    return ticketsDb
  };


const getTicketById = async (ticketId) => {
    const ticketDocRef = doc(ticketsRef, ticketId)
    const ticketDoc = await getDoc(ticketDocRef)
    if (ticketDoc.exists()) {
      return { id: ticketDoc.id, ...ticketDoc.data() }
    } else {
      console.log("No such document!")
      return null;
    }
  }

  const addComment = async (ticketId, comment) => {
    const ticketDocRef = doc(ticketsRef, ticketId)
    const ticketDoc = await getDoc(ticketDocRef)
  
    if (ticketDoc.exists()) {
      const comments = ticketDoc.data().comments || []
      comments.push(comment)
  
      await updateDoc(ticketDocRef, { comments })
    } 
  }

  const updateTicket = async (ticketId, newInfo)=>{
    const ticketDocRef = doc(ticketsRef, ticketId)
    const ticketDoc = await getDoc(ticketDocRef)

    if (ticketDoc.exists()){
            await updateDoc(ticketDocRef, newInfo)
        }
    }

  const createNewTicket = async (newData) => {
    await addDoc(ticketsRef, newData)
    console.log("new ticket submitted")
  }


  //  authentication
  const auth = getAuth()
  let user = null

  const logIn = async () =>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user.reloadUserInfo.displayName))
    return user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  const signIn = async() => {
    createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user.reloadUserInfo.displayName))
    return user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  const logOut = () => {
    signOut(auth).then (()=>{console.log("you've been succesfully signed out")
    localStorage.removeItem('authenticatedUser')
    })

  }
  

    



export {auth,db, ticketsRef, getTicketById, getTickets, addComment, updateTicket, createNewTicket, user, signIn, logIn, logOut}


