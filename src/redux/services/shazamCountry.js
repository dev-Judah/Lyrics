import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCountry = createApi({
  reducerPath: "shazamCountry",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api6.p.rapidapi.com/shazam",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "447b624f3dmsh2e2ff5461caae6fp10d4b8jsnc53376f1eb64",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCountryTopCharts: builder.query({
      query: (countryCode) =>
        `/top_tracks_country?country_code=${countryCode}&limit=20`,
    }),
  }),
});

export const { useGetCountryTopChartsQuery } = shazamCountry;
