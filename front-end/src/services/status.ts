import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatus } from "../schema/status";

const statusApi = createApi({
  reducerPath: "status",
  tagTypes: ["Status"],
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
      status: builder.query<TStatus[], void>({
        query: () => {
          return {
            url: "/status",
            method: "GET",
          };
        },
        providesTags: ["Status"],
      }),

      getStatusById: builder.query<TStatus, number>({
        query: (status) => {
          return {
            url: `/status/${status}`,
            method: "GET",
          };
        },
        providesTags: ["Status"],
      }),
      
      createStatus: builder.mutation<TStatus[], Partial<TStatus>>({
        query: (statusData) => ({
          url: "/status",
          method: "POST",
          body: statusData, 
        }),
        invalidatesTags: ["Status"],
      }),

      updateStatus: builder.mutation<TStatus, TStatus>({
        query: (status) => ({
            url: `/status/${status.id}`,
            method: "PUT",
            body: status,
        }),
        invalidatesTags: ["Status"],
    }),

    };
  },
});

export const { useStatusQuery, useCreateStatusMutation, useUpdateStatusMutation, useGetStatusByIdQuery } = statusApi;
export const statusReducer = statusApi.reducer;
export default statusApi;
