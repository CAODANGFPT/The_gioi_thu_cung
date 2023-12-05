import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LogoResponseSchema, TLogo } from "../schema/logo";

const LogoApi = createApi({
  reducerPath: "logo",
  tagTypes: ["Logo"],
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
      getAllLogo: builder.query<TLogo[], void>({
        query: () => {
          return {
            url: "/logo",
            method: "GET",
          };
        },
        providesTags: ["Logo"],
      }),
      getLogoById: builder.query<TLogo, number>({
        query: (id) => {
          return {
            url: `/logo/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Logo"],
      }),
      updateLogo: builder.mutation<TLogo[], Partial<TLogo>>({
        query: (logo) => {
          return {
            url: `/editLogo`,
            method: "PATCH",
            body: logo,
          };
        },
        invalidatesTags: ["Logo"],
      }),
      createLogo: builder.mutation<LogoResponseSchema, Partial<TLogo>>({
        query: (logo) => ({
          url: "/logo",
          method: "POST",
          body: logo,
        }),
        invalidatesTags: ["Logo"],
      }),
      removeLogo: builder.mutation<TLogo, number>({
        query: (id) => {
          return {
            url: `/logo/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Logo"],
      }),
    };
  },
});

export const {
  useGetAllLogoQuery,
  useCreateLogoMutation,
  useRemoveLogoMutation,
  useGetLogoByIdQuery,
  useUpdateLogoMutation,
} = LogoApi;
export const logoReducer = LogoApi.reducer;
export default LogoApi;
