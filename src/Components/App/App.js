import React, { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

function App() {
  // const initialSearchValue = [
  //   { name: "name1", artist: "artist1", album: "album1", id: 1 },
  //   { name: "name2", artist: "artist2", album: "album2", id: 2 },
  //   { name: "name3", artist: "artist3", album: "album3", id: 3 },
  // ];

  // const initialPlaylistTracks = [
  //   {
  //     name: "playlistName1",
  //     artist: "playlistArtist1",
  //     album: "playlistAlbum1",
  //     id: 4,
  //   },
  //   {
  //     name: "playlistName2",
  //     artist: "playlistArtist2",
  //     album: "playlistAlbum2",
  //     id: 5,
  //   },
  //   {
  //     name: "playlistName3",
  //     artist: "playlistArtist3",
  //     album: "playlistAlbum3",
  //     id: 6,
  //   },
  // ];

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState({
    playlistName: "My Playlist",
  });
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    let tracks = playlistTracks;
    if (tracks.includes(track)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks(
      playlistTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  const search = async (term) => {
    const search = await Spotify.search(term);
    setSearchResults(search);
  };

  return (
    <div>
      <h1>
        ม่วนหล<span className="highlight">าาาาาาาา</span>ย
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
