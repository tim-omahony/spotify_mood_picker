// src/MoodButton.js
import React from 'react';

const MoodButton = ({ mood, onClick }) => {
    // Apply a specific class for the "Hacking" mood
    const buttonClass = mood === "Hacking" ? "mood-button hacking-button" : "mood-button";

    return (
        <button className={buttonClass} onClick={() => onClick(mood)}>
            {mood}
        </button>
    );
};

export default MoodButton;
