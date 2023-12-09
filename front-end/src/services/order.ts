import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOrderAdminSchema } from "../schema/order";

const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["order"],
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
      createOrder: builder.mutation<any, any>({
        query: (data) => ({
          url: `/createOrder`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["order"],
      }),
      getAllOrderUser: builder.query<TOrderAdminSchema[], void>({
        query: () => {
          return {
            url: "/getAllOrderUser",
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useGetAllOrderUserQuery
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
