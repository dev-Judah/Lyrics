import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetSongDetailsQuery(songid);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause);
  };
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Searching song Details" />;
  if (error) return <Error />;
  let lyricsKey = data?.resources?.lyrics || null;

  if (!lyricsKey)
    return <p className="text-gray-400 text-semibold my-1">No Lyrics Found</p>;
  lyricsKey = Object.keys(lyricsKey);
  const lyrics = data?.resources.lyrics[lyricsKey[0]].attributes.text;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songid={songid} songData={data} />

      <div className="mb-10">
        <h2 className="text-white text-3xl">Lyrics</h2>

        <div className="mt-5">
          {lyrics ? (
            lyrics?.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1" key={i}>
              No Lyrics Found
            </p>
          )}
        </div>
      </div>
      {/* <RelatedSongs
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId=""
      /> */}
    </div>
  );
};

export default SongDetails;
