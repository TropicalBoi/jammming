import "./SearchResults.css";
import TrackList from "../Tracklist/TrackList";

function SearchResults(props) {
  const { searchResults, onAdd } = props;

  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
}

export default SearchResults;
