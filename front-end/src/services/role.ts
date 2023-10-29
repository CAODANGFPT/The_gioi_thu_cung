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
        providesTags: ["Role"],
      }),
      roleById: builder.query<TRole, number>({
        query: (id) => {
          return {
            url: `/role/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Role"],
      }),

      createRole: builder.mutation<TRole[], Partial<TRole>>({
        query: (roleData) => ({
          url: "/role",
          method: "POST",
          body: roleData,
        }),
      }),
      updateRole: builder.mutation<TRole, Partial<TRole>>({
        query: (role) => {
          return {
            url: `/editRole`,
            method: "PATCH",
            body: role,
          };
        },
        invalidatesTags: ["Role"],
      }),
    };
  },
});

export const {
  useRoleQuery,
  useRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
