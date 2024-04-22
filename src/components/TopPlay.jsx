import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css";
import "swiper/css/free-mode";
import Loader from "./Loader";

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    if (isFetching) return;
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isFetching]);

  const topPlays = data?.tracks.slice(0, 5);
  const topArtists = data?.tracks.slice(0, 8);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetching) return;

  return (
    <div
      ref={divRef}
      className="xl:ml-6  ml-0 xl:mb-0  mb-6 flex-1 xl:max-w-[300px] max-w-full flex flex-col "
    >
      <div className="w-full flex flex-col ">
        <div className="flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl"> Top Charts</h2>
          <Link to="/top-charts">
            <p className=" text-gray-300 cursor-pointer text-base">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
              song={song}
              i={i}
              key={song.key}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-3">
        <div className="flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl"> Top Artists</h2>
          <Link to="/top-artists">
            <p className=" text-gray-300 cursor-pointer text-base">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          className="mt-4  md:w-11/12"
        >
          {topArtists?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "15%", height: "15%" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song.images?.background}
                  alt={song.artists?.alias}
                  className="rounded-full h-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex  flex-grow items-center hover:bg-[#4c426e] py-2  rounded-lg cursor-pointer mb-1">
      <h3 className="font-bold text-white text-base mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-[40px]  rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-sm font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-xs text-gray-300 mt-1 ">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default TopPlay;
