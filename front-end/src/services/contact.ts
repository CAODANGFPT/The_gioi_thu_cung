import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TContact } from "../schema/contact";

const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      contact: builder.query<TContact[], void>({
        query: () => {
          return {
            url: "/getContactUser",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useContactQuery } = contactApi;
export const contactReducer = contactApi.reducer;
export default contactApi;
