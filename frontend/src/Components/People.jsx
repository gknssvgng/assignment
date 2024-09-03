import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function PeoplePage() {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

  
    

    return (
        <div className="settings-container">
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <div className="settings-icons">
                {people.map((person, index) => (
                    <div key={person.type} className="person">
                        <img src={`/${person.type}.png`} alt={person.type} />
                        <br/>
                        <h1>{person.type}</h1>
                        <input
                            type="number"
                            value={person.count}
            
                            className="count-input"
                            disabled
                        />
                    </div>
                ))}
            </div>
          
        </div>
    );
}

export default PeoplePage;
