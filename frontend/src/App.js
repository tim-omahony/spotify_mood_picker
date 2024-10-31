// src/App.js
import React, { useState } from 'react';
import MoodButton from './MoodButton';
import Playlist from './Playlist';
import './App.css'; // Import the CSS file

const moods = ["Happy", "Sad", "Relaxed", "Energetic", "Hacking"];

function App() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPlaylist = async (mood) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/playlists/${mood}`);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error("Error fetching playlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>pick some good tunes for the love of god</h1>
            <div className="mood-buttons">
                {moods.map((mood) => (
                    <MoodButton key={mood} mood={mood} onClick={fetchPlaylist} />
                ))}
            </div>
            {loading ? <p>Loading...</p> : <Playlist songs={songs} />}
        </div>
    );
}

export default App;
