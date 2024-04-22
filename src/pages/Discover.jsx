import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player,
  );
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "pop";
  //display if data is loading
  if (isFetching) return <Loader title="Loading songs" />;

  //display if there is an error
  if (error) return <Error message={error.message} />;

  //
  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
          value={genreListId}
          onChange={() => {
            dispatch(selectGenreListId(e.target.value));
          }}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      {/* //songs wrapper */}
      <div className="flex flex-wrap sm:justify-start  justify-center gap-[16px]">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
