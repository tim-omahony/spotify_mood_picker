// src/Playlist.js
import React from 'react';

export default function Playlist({ songs }) {
    return (
        <div className="playlist">
            {songs.length === 0 ? (
                <p>No songs available. Please select a mood.</p>
            ) : (
                songs.map((song, index) => (
                    <div key={index} className="song">
                        <img src={song.cover} alt={`${song.name} cover`} />
                        <div>
                            <h3>{song.name}</h3>
                            <p>{song.artist}</p>
                            <a href={song.url} target="_blank" rel="noopener noreferrer">
                                Listen on Spotify
                            </a>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
