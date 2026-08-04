JavaScript
const formattedDate = () => {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(today);
};

const timeStamp = () => {
  // Returns current Unix timestamp in seconds (matching your Python backend)
  return Math.floor(Date.now() / 1000);
};

const sortTicketsByDate = (tickets) => { 
  if (!Array.isArray(tickets)) return [];
  
  return [...tickets].sort((a, b) => {
    // MySQL / FastAPI returns time_stamp as a raw integer or created_on string
    const timeA = a.time_stamp || new Date(a.created_on).getTime() || 0;
    const timeB = b.time_stamp || new Date(b.created_on).getTime() || 0;
    
    // Sort descending (newest first)
    return timeB - timeA;
  });
};

const getLocationName = (location) => {
  const locationMap = {
    dallasHighschool: "Dallas Highschool",
    dallasJuniorHigh: "Dallas Junior High",
    dallasElementary: "Dallas Elementary",
    duncanville: "Duncanville",
    mansfield: "Mansfield"
  };
  return locationMap[location] || location || "Unknown";
};

const getModifiedFields = (newData, originalData) => {
  const modifiedFields = {};
  for (const key in newData) {
    if (newData[key] !== originalData[key] && newData[key] !== "") {
      modifiedFields[key] = newData[key];
    }
  }
  return modifiedFields;
};

function getName(email) {
  if (!email) return "";
  const newUser = email
    .split("@")[0]
    .split(".")
    .map(element => element.charAt(0).toUpperCase() + element.slice(1))
    .join(" ");
  return newUser;
}

export { 
  formattedDate, 
  timeStamp, 
  sortTicketsByDate, 
  getLocationName, 
  getModifiedFields, 
  getName 
};