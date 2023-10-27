import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSetTime } from "../schema/setTime";

const setTimeApi = createApi({
  reducerPath: "setTime",
  tagTypes: ["SetTime"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      setTime: builder.query<TSetTime[], void>({
        query: () => {
          return {
            url: "/setTime",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useSetTimeQuery } = setTimeApi;
export const setTimeReducer = setTimeApi.reducer;
export default setTimeApi;
