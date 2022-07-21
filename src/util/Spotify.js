const clientId = "25fed3262e0d4b229b6aac27ca9b6fe3";
const redirectUri = "https://localhost:3000/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    try {
      let accessToken = Spotify.getAccessToken();
      console.log(accessToken);

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      } else {
        throw new Error("search request failed");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(name, trackUris) {
    try {
      if (!name || !trackUris.length) {
        return;
      }

      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
      let playlistId;
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: headers,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        userId = jsonResponse.id;
      } else {
        throw new Error("user Id request failed");
      }

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      if (playlistResponse.ok) {
        const playlistJsonRespone = await playlistResponse.json();
        playlistId = playlistJsonRespone.id;
      } else {
        throw new Error("playlist id request failed");
      }

      const addPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
