import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TContact } from "../schema/contact";

const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contact"],
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
      contact: builder.query<TContact[], void>({
        query: () => {
          return {
            url: "/getContactUser",
            method: "GET",
          };
        },
        providesTags: ["Contact"],
      }),
      contactById: builder.query<TContact, number>({
        query: (id) => {
          return {
            url: `/contact/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Contact"],
      }),

      getContact: builder.query<TContact, void>({
        query: (id) => {
          return {
            url: `/getContactUser`,
            method: "GET",
          };
        },
        providesTags: ["Contact"],
      }),

      updateStatusContact: builder.mutation<TContact, Partial<TContact>>({
        query: (status) => {
          return {
            url: `/updateStatus`,
            method: "PUT",
            body: status,
          };
        },
        invalidatesTags: ["Contact"],
      }),
    };
  },
});

export const {
  useContactQuery,
  useContactByIdQuery,
  useGetContactQuery,
  useUpdateStatusContactMutation,
} = contactApi;
export const contactReducer = contactApi.reducer;
export default contactApi;
