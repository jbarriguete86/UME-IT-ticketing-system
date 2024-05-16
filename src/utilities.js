const formatDate = () => {
    const today = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(today);
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

export {formatDate, getLocationName, getModifiedFields}