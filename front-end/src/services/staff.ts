import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStaff } from "../schema/staff";

const staffApi = createApi({
  reducerPath: "staff",
  tagTypes: ["Staff"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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
    };
  },
});

export const { useStaffQuery } = staffApi;
export const staffReducer = staffApi.reducer;
export default staffApi;
