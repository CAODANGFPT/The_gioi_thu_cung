import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatusContact } from "../schema/status_contact";

const statusContactApi = createApi({
  reducerPath: "status_contact",
  tagTypes: ["Status_contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const user = localStorage.getItem("user");
      if (user) {
        const { accessToken } = JSON.parse(user);
        if (accessToken) {
          headers.set("Authorization", "Bearer " + accessToken);
        }
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAlllstatusContact: builder.query<TStatusContact[], void>({
        query: () => {
          return {
            url: "/status_contact",
            method: "GET",
          };
        },
      }),
      
    };
  },
});

export const { useGetAlllstatusContactQuery } = statusContactApi;
export const statusContactReducer = statusContactApi.reducer;
export default statusContactApi;
