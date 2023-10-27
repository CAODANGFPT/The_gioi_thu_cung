import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TServices } from "../schema/services";

const servicesApi = createApi({
  reducerPath: "services",
  tagTypes: ["Services"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      services: builder.query<TServices[], void>({
        query: () => {
          return {
            url: "/services",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useServicesQuery } = servicesApi;
export const servicesReducer = servicesApi.reducer;
export default servicesApi;
