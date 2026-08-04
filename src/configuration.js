JavaScript
import { initializeApp } from "firebase/app";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  getAuth, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

// --- Firebase Auth Setup ---
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
const auth = getAuth(app);
let user = null;

// --- FastAPI Base URL ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// --- API Functions (MySQL / FastAPI) ---

const getTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets`);
  if (!response.ok) throw new Error("Failed to fetch tickets");
  return await response.json();
};

const getTicketById = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
  if (!response.ok) {
    console.log("No such ticket found!");
    return null;
  }
  return await response.json();
};

const addComment = async (ticketId, commentPayload) => {
  // Expects commentPayload = { user: "Admin", comment: "Text", date: "YYYY-MM-DD" }
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentPayload)
  });
  if (!response.ok) throw new Error("Failed to add comment");
  return await response.json();
};

const updateTicket = async (ticketId, newInfo) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInfo)
  });
  if (!response.ok) throw new Error("Failed to update ticket");
  return await response.json();
};

const createNewTicket = async (newData) => {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  });
  if (!response.ok) throw new Error("Failed to create ticket");
  console.log("New ticket submitted");
  return await response.json();
};

// --- Authentication Functions ---

const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user.displayName || user.email));
    return user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user.displayName || user.email));
    return user;
  } catch (error) {
    console.error("Sign up Error:", error.message);
    throw error;
  }
};

const logOut = () => {
  signOut(auth).then(() => {
    console.log("You've been successfully signed out");
    localStorage.removeItem('authenticatedUser');
  });
};

export { 
  auth, 
  getTicketById, 
  getTickets, 
  addComment, 
  updateTicket, 
  createNewTicket, 
  user, 
  signIn, 
  logIn, 
  logOut 
};
