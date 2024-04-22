import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistid } = useParams();
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistid);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause);
  };

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Artsits Details..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistid} artistData={artistData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl">Artist Details</h2>
      </div>

      <RelatedSongs
        data={Object.values(artistData?.resources.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId={artistid}
      />
    </div>
  );
};

export default ArtistDetails;
