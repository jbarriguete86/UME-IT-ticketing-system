
export const dat = [
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
