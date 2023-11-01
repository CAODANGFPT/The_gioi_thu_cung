import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProfile } from "../schema/profile";

const profileApi = createApi({
  reducerPath: "profile",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
          headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
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
             providesTags: ["Profile"],
      }),
       removeProfile: builder.mutation<TProfile, number>({
        query: (id) => {
          return {
            url: `/profile/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Profile"],
      }),
    };
  },
});

export const { useProfileQuery, useRemoveProfileMutation } = profileApi;
export const profileReducer = profileApi.reducer;
export default profileApi;
