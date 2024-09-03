import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required elements and components
ChartJS.register(ArcElement, Tooltip, Legend);

function PeoplePage() {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            const url = 'http://localhost:4000/api/people';
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setPeople(response.data);
        } catch (err) {
            setError('Error fetching data. Please try again later.');
        }
    };

    const chartData = {
        labels: people.map(person => person.type),
        datasets: [
            {
                label: 'Population Count',
                data: people.map(person => person.count),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="settings-container">
            {error && <p className="error">{error}</p>}
            <div className="settings-icons">
                {people.map((person, index) => (
                    <div key={person.type} className="person">
                        <img src={`/${person.type}.png`} alt={person.type} />
                        <br/>
                     
                        <input
                            type="number"
                            value={person.count}
                            className="count-people"
                            disabled
                        />
                    </div>
                ))}
            </div>

            <div className="chart-container">
                <h2>Population Distribution</h2>
                <Pie data={chartData} />
            </div>
        </div>
    );
}

export default PeoplePage;
