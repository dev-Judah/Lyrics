import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

import { useParams } from "react-router-dom";
import { useGetSearchTermQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSearchTermQuery(searchTerm);

  if (isFetching) return <Loader title="Searching for songs and artists..." />;
  console.log(data);
  if (error) return <Error />;
  const songs = data?.tracks?.hits.map((song) => song.track);
  console.log(songs);

  return (
    <div className="flex flex-col ">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">"{searchTerm}"</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-[16px]">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
