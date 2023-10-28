import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRole } from "../schema/role";

const roleApi = createApi({
  reducerPath: "role",
  tagTypes: ["Role"],
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
      role: builder.query<TRole[], void>({
        query: () => {
          return {
            url: "/role",
            method: "GET",
          };
        },
      }),

      createRole: builder.mutation<TRole[], Partial<TRole>>({
        query: (roleData) => ({
          url: "/role",
          method: "POST",
          body: roleData, 
        }),
      }),
    };
  },
});

export const { useRoleQuery, useCreateRoleMutation } = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
