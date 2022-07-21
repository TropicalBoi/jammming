import React from "react";
import "./Playlist.css";
import TrackList from "../Tracklist/TrackList";

function Playlist(props) {
  const { playListName, playlistTracks, onRemove, onSave, onNameChange } =
    props;

  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input defaultValue={playListName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        เมี้ยนไปม่วน!
      </button>
    </div>
  );
}

export default Playlist;
