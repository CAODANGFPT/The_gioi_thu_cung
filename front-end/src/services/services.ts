import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TServices, TServicesRequest } from "../schema/services";

const servicesApi = createApi({
  reducerPath: "services",
  tagTypes: ["Services"],
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
      services: builder.query<TServices[], void>({
        query: () => {
          return {
            url: "/services",
            method: "GET",
          };
        },
        providesTags: ["Services"],
      }),
      servicesById: builder.query<TServicesRequest, number>({
        query: (id) => {
          return {
            url: `/services/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Services"],
      }),
      addServices: builder.mutation<
        TServicesRequest,
        Partial<TServicesRequest>
      >({
        query: (services) => {
          return {
            url: "/services",
            method: "POST",
            body: services,
          };
        },
        invalidatesTags: ["Services"],
      }),
      updateServices: builder.mutation<
        TServicesRequest,
        Partial<TServicesRequest>
      >({
        query: (services) => {
          return {
            url: `/services/${services.id}`,
            method: "PUT",
            body: services,
          };
        },
        invalidatesTags: ["Services"],
      }),
      deleteServices: builder.mutation<any, number>({
        query: (id) => {
          return {
            url: `/services/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Services"],
      }),
    };
  },
});

export const {
  useServicesQuery,
  useAddServicesMutation,
  useServicesByIdQuery,
  useUpdateServicesMutation,
  useDeleteServicesMutation,
} = servicesApi;
export const servicesReducer = servicesApi.reducer;
export default servicesApi;
