import React, { useEffect, useState} from "react"
import styles from "../App.module.css"
import { Bar } from "react-chartjs-2"

export default function Home(){
    const [chartData, setChartData]= useState({
       openTickets: 5,
       unassignedTickets: 200,
       closedTickets: 1
    })

    const updateChartData = () => {
        // Simulating data update
        const newChartData = {
          openTickets: Math.floor(Math.random() * 100), // Random number between 0 and 100
          unassignedTickets: Math.floor(Math.random() * 100),
          closedTickets: Math.floor(Math.random() * 100),
        };
        setChartData(newChartData);
      }


      useEffect(() => {
        // Call the function to update chart data when component mounts
        updateChartData();
      }, [])

    return (
        <div className={styles.home_container}>
            <h2>Welcome to the UME IT ticketing system</h2>
            <div className={styles.home_wrapper}>
                <div className={styles.ticket_type_container}>
                    <p>Unassigned tickets</p>
                    <p>{chartData.unassignedTickets}</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Solved tickets</p>
                    <p>{chartData.closedTickets}</p>
                </div>
                <div className={styles.ticket_type_container}>
                    <p>Open tickets</p>
                    <p>{chartData.openTickets}</p>
                </div>
                    
                <div key="chartContainer" className={styles.chart_container}>

                </div>
            </div>

        </div>
    )
}