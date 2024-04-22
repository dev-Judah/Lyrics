import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0";
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "31d5a53101mshd6c62cc74035f8ap1af296jsnc7b052809908",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/track?locale=en-US&pageSize=20&startFrom=0",
    }),
    getSongDetails: builder.query({
      query: (songid) => `/shazam-songs/get-details?id=${songid}&locale=en-US`,
    }),
    getSongDetailSummary: builder.query({
      query: (songid) => `/songs/get-details?key=${songid}&locale=en-US`,
    }),
    getSongRelated: builder.query({
      query: (songid) =>
        `/shazam-songs/list-similarities?id=track-similarities-id-${songid}&locale=en-US`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-summary?id=${artistId}&l=en-US`,
    }),
    getSearchTerm: builder.query({
      query: (searchTerm) =>
        `/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongDetailSummaryQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSearchTermQuery,
} = shazamCoreApi;
