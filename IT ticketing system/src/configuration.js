
import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, updateDoc, collection, getFirestore } from "firebase/firestore";
import {getModifiedFields} from "./utilities.js"

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
    const ticketDocRef = doc(ticketsRef, ticketId);
    const ticketDoc = await getDoc(ticketDocRef);
    if (ticketDoc.exists()) {
      return { id: ticketDoc.id, ...ticketDoc.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  }

  const addComment = async (ticketId, comment) => {
    const ticketDocRef = doc(ticketsRef, ticketId);
    const ticketDoc = await getDoc(ticketDocRef);
  
    if (ticketDoc.exists()) {
      const comments = ticketDoc.data().comments || [];
      comments.push(comment);
  
      await updateDoc(ticketDocRef, { comments });
      console.log("Comment added!");
    } else {
      console.log("No such document!");
    }
  }

  const updateTicket = async (ticketId, newInfo)=>{
    const ticketDocRef = doc(ticketsRef, ticketId)
    const ticketDoc = await getDoc(ticketDocRef)

    if (ticketDoc.exists()){
            await updateDoc(ticketDocRef, newInfo)
            console.log("Document updated")
        } else {
        console.log("No such document!")
        }
    }



export {db, ticketsRef, getTicketById, getTickets, addComment, updateTicket}



// const dat = [
//     {
//     id:1,
//     description: "The computer is not working everytime I press start is not powering on",
//     personReporting: "Mr. Lamae",
//     location:"dallasHighschool",
//     room:"209",
//     category:"computer",
//     isAssigned: false,
//     personAssigned:"",
//     isSolved: false,
//     dateClosed:"",
//     comments:[]
// },
// {
//     id:2,
//     description: "Upstair printer jamming every other print",
//     personReporting: "Mr. Loomis",
//     location:"dallasElementary",
//     room:"",
//     category:"printer",
//     isAssigned: false,
//     personAssigned:"",
//     isSolved: false,
//     dateClosed:"",
//     comments:[]
// },
// {
//     id:3,
//     description: "downstair printer jamming every other print",
//     personReporting: "Mr. Artemis",
//     location:"dallasHighschool",
//     room:"teacher workroom",
//     category:"printer",
//     isAssigned: true,
//     personAssigned:"Landy Williams",
//     isSolved: false,
//     dateClosed:"",
//     comments:[]
// },
// {
//     id:4,
//     description: "laptop not displaying sound",
//     personReporting: "Mr. Grace",
//     location:"duncanville",
//     room:"127-B",
//     category:"computer",
//     isAssigned: true,
//     personAssigned:"Jose Barriguete",
//     isSolved: true,
//     dateClosed:"05/06/2024",
//     comments:[
//         {key:"dfer3", user:"Landy Williams", comment:"I talked to the teacher and ask her to reset the laptop, but that didn't work", date:"may 2nd, 2024"},
//         {key:"dfer4",user:"Jose Barriguete", comment:"I sent an email to the teacher, will visit the campus on may 6th, to troubleshoot on premises", date:"may 4th, 2024"},
//         {key:"dfer5", user:"Jose Barriguete", comment:"Reset the laptop and it worked again, I send the email closing the ticket on may 6th, 2024", date:"may 6th,2024"}
//     ]
// }
// ]