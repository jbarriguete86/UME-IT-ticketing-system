const formattedDate = () => {
    const today = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(today);
  }

  const timeStamp = ()=>{
    const today = new Date()
    return today
  }

  const sortTicketsByDate = (tickets) => { 
    return tickets.sort((a, b) => {
        const timeA= a.timeStamp.seconds * 1000 + Math.floor(a.timeStamp.nanoseconds / 1000000)
        const timeB = b.timeStamp.seconds * 1000 + Math.floor(b.timeStamp.nanoseconds / 1000000)
        return timeB - timeA
        });
}

  const getLocationName = (location) =>{
    const locationMap = {
        dallasHighschool: "Dallas Highschool",
        dallasJuniorHigh: "Dallas Junior High",
        dallasElementary: "Dallas Elementary",
        duncanville: "Duncanville",
        mansfield: "Mansfield"
    };
    return locationMap[location] || "Unknown";
}

const getModifiedFields = (newData, originalData) => {
    const modifiedFields = {};
    for (const key in newData) {
        if (newData[key] !== originalData[key] && newData[key] !== "") {
            modifiedFields[key] = newData[key];
        }
    }
    return modifiedFields;
}

function getName(email){
    const newUser = email.split("@")[0].split(".").map(element => element.charAt(0).toUpperCase() + element.slice(1)).join(" ")
    return newUser
}

export {formattedDate,timeStamp, sortTicketsByDate, getLocationName, getModifiedFields, getName}