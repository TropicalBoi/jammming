import React, { useState } from "react";
import "./Playlist.css";
import TrackList from "../Tracklist/TrackList";

function Playlist(props) {
  const { playListName, playlistTracks, onRemove, onSave, onNameChange } =
    props;
  const [name, setName] = useState(playListName);

  const handleNameChange = (e) => {
    setName(e.target.value);
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input defaultValue={playListName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
