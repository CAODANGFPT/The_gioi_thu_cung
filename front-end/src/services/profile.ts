import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProfile } from "../schema/profile";

const profileApi = createApi({
  reducerPath: "profile",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      profile: builder.query<TProfile[], void>({
        query: () => {
          return {
            url: "/profile",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useProfileQuery } = profileApi;
export const profileReducer = profileApi.reducer;
export default profileApi;
