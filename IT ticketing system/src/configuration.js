
const dat = [
    {
    id:1,
    description: "The computer is not working everytime I press start is not powering on",
    personReporting: "Mr. Lamae",
    location:"dallasHighschool",
    room:"209",
    category:"computer",
    isAssigned: false,
    personAssigned:"",
    isSolved: false,
    dateClosed:"",
    comments:[]
},
{
    id:2,
    description: "Upstair printer jamming every other print",
    personReporting: "Mr. Loomis",
    location:"dallasElementary",
    room:"",
    category:"printer",
    isAssigned: false,
    personAssigned:"",
    isSolved: false,
    dateClosed:"",
    comments:[]
},
{
    id:3,
    description: "downstair printer jamming every other print",
    personReporting: "Mr. Artemis",
    location:"dallasHighschool",
    room:"teacher workroom",
    category:"printer",
    isAssigned: true,
    personAssigned:"Landy Williams",
    isSolved: false,
    dateClosed:"",
    comments:[]
},
{
    id:4,
    description: "laptop not displaying sound",
    personReporting: "Mr. Grace",
    location:"duncanville",
    room:"127-B",
    category:"computer",
    isAssigned: true,
    personAssigned:"Jose Barriguete",
    isSolved: true,
    dateClosed:"05/06/2024",
    comments:[
        {key:"dfer3", user:"Landy Williams", comment:"I talked to the teacher and ask her to reset the laptop, but that didn't work", date:"may 2nd, 2024"},
        {key:"dfer4",user:"Jose Barriguete", comment:"I sent an email to the teacher, will visit the campus on may 6th, to troubleshoot on premises", date:"may 4th, 2024"},
        {key:"dfer5", user:"Jose Barriguete", comment:"Reset the laptop and it worked again, I send the email closing the ticket on may 6th, 2024", date:"may 6th,2024"}
    ]
}
]


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa3k_2b1ac5QohdYfSMuFv61hJO6qy39o",
  authDomain: "it-ticketing-system-a3ffe.firebaseapp.com",
  projectId: "it-ticketing-system-a3ffe",
  storageBucket: "it-ticketing-system-a3ffe.appspot.com",
  messagingSenderId: "101082453323",
  appId: "1:101082453323:web:4c2e656df7c4f774cac4ce",
  measurementId: "G-YETCFMJRGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const ticketsRef= collection(db, "Tickets")
let ticketDb = ""
const getTickets = async () => {
    const querySnapshot = await getDocs(ticketsRef);
    const ticketsDb = [];
    querySnapshot.forEach((doc) => {
        ticketsDb.push({ id: doc.id, ...doc.data() });
    });
    return ticketsDb
  };

ticketDb = await getTickets()



export {dat, db, ticketsRef, ticketDb}