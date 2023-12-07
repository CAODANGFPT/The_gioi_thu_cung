import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    };
  },
});

export const {
  useCreateOrderMutation,

} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
