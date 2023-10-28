import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TServices, TServicesRequest } from "../schema/services";

const servicesApi = createApi({
  reducerPath: "services",
  tagTypes: ["Services"],
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
      services: builder.query<TServices[], void>({
        query: () => {
          return {
            url: "/services",
            method: "GET",
          };
        },
        providesTags: ["Services"],
      }),
      addServices: builder.mutation<TServicesRequest, Partial<TServicesRequest>>({
        query: (services) => {
          return {
            url: "/services",
            method: "POST",
            body: services,
          };
        },
        invalidatesTags: ["Services"],
      }),
    };
  },
});

export const { useServicesQuery, useAddServicesMutation} = servicesApi;
export const servicesReducer = servicesApi.reducer;
export default servicesApi;
