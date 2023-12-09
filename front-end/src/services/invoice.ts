import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TInvoice } from "../schema/invoice";

const invoiceApi = createApi({
  reducerPath: "invoice",
  tagTypes: ["Invoice"],
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
      getInvoices: builder.query<TInvoice[], void>({
        query: () => {
          return {
            url: "/invoices",
            method: "GET",
          };
        },
        providesTags: ["Invoice"],
      }),

      createInvoice: builder.mutation<TInvoice, Partial<TInvoice>>({
        query: (invoiceData) => ({
          url: "/createInvoice",
          method: "POST",
          body: invoiceData,
        }),
        invalidatesTags: ["Invoice"],
      }),

      updateStatusCash: builder.mutation<TInvoice[], TInvoice>({
        query: (appointments_id) => {
          return {
            url: `/updateStatusCash/${appointments_id}`,
            method: "PUT",
            body: appointments_id,
          };
        },
        invalidatesTags: ["Invoice"],
      }),
      getInvoiceByAppointmentID: builder.query<TInvoice[], number>({
        query: (appointments_id) => ({
          url: `/getInvoiceByAppointmentID/${appointments_id}`,
          method: "GET",
        }),
        providesTags: ["Invoice"],
      }),
    };
  },
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateStatusCashMutation,
  useGetInvoiceByAppointmentIDQuery,
} = invoiceApi;
export const invoiceReducer = invoiceApi.reducer;
export default invoiceApi;
