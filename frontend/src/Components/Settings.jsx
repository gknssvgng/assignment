import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function SettingsPage() {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchPeople();
    }, []);
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [success]);


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

    const handleChange = (index, event) => {
        const newPeople = [...people];
        newPeople[index].count = event.target.value;
        setPeople(newPeople);
    };

    const handleSubmit = async () => {
        try {
            for (const person of people) {
                await axios.post('http://localhost:4000/api/people', person, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
            }
            setSuccess('Data updated successfully!');
            setError(null);
        } catch (err) {
            setError('Failed to update data. Please try again later.');
            setSuccess(null);
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
                     
                        <input
                            type="number"
                            value={person.count}
                            onChange={(e) => handleChange(index, e)}
                            className="count-input"
                        />
                    </div>
                ))}
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default SettingsPage;
