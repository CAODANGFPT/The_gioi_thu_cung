import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRole } from "../schema/role";

const roleApi = createApi({
  reducerPath: "role",
  tagTypes: ["Role"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      role: builder.query<TRole[], void>({
        query: () => {
          return {
            url: "/role",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useRoleQuery } = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
