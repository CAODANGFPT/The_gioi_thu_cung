import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBlockService, TServices, TServicesRequest } from "../schema/services";

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
      servicesTop4: builder.query<TServices[], void>({
        query: () => {
          return {
            url: "/servicesTop4",
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
      updateBlockServices: builder.mutation<
        TBlockService,
        Partial<TBlockService>
      >({
        query: (services) => {
          return {
            url: `/services/block`,
            method: "PATCH",
            body: services,
          };
        },
        invalidatesTags: ["Services"],
      }),
    };
  },
});

export const {
  useServicesQuery,
  useServicesTop4Query,
  useAddServicesMutation,
  useServicesByIdQuery,
  useUpdateServicesMutation,
  useUpdateBlockServicesMutation,
} = servicesApi;
export const servicesReducer = servicesApi.reducer;
export default servicesApi;
