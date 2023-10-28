import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStaff } from "../schema/staff";

const staffApi = createApi({
  reducerPath: "staff",
  tagTypes: ["Staff"],
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
      staff: builder.query<TStaff[], void>({
        query: () => {
          return {
            url: "/staff",
            method: "GET",
          };
        },
      }),

      createStaff: builder.mutation<TStaff[], Partial<TStaff>>({
        query: (staffData) => ({
          url: "/staff",
          method: "POST",
          body: staffData,
        }),
      }),
    };
  },
});

export const { useStaffQuery, useCreateStaffMutation } = staffApi;
export const staffReducer = staffApi.reducer;
export default staffApi;
