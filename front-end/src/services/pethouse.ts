import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TpetHouse } from "../schema/pethouse";

const pethouseApi = createApi({
  reducerPath: "pethouse",
  tagTypes: ["PetHouse"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      pethouse: builder.query<TpetHouse[], void>({
        query: () => {
          return {
            url: "/pethouse",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { usePethouseQuery } = pethouseApi;
export const pethouseReducer = pethouseApi.reducer;
export default pethouseApi;
