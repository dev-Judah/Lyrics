import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Error from "./Error";
const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause);
  };
  if (!song.hub.actions) return;
  return (
    <div className=" flex flex-col w-[200px] p-4 bg-white/5   bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className=" relative w-full h-30 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black  bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? "flex  bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img src={song.images?.coverart} alt="song_img" />
      </div>
      <div className=" mt-4 flex flex-col">
        <p className=" font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className=" text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0].adamid}`
                : "/top-artist"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
