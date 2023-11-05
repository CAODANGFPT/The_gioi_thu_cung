import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBlockUser, TRoleUser, TUser } from "../schema/user";
import {
  TResetPasswordUserSchema,
  TUpdatePasswordUserSchema,
} from "../schema/resetPassword";

const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
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
      user: builder.query<TUser[], void>({
        query: () => {
          return {
            url: "/getAllUserRole",
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      userById: builder.query<TUser, number>({
        query: (id) => {
          return {
            url: `/getById/${id}`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      getUser: builder.query<TUser, void>({
        query: () => {
          return {
            url: `/getUser`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      resetPasswordUser: builder.mutation<
        void,
        Partial<TResetPasswordUserSchema>
      >({
        query: (user) => {
          return {
            url: "/password/reset",
            method: "POST",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
      updateBlockUser: builder.mutation<TBlockUser, Partial<TBlockUser>>({
        query: (user) => {
          return {
            url: "/user/block",
            method: "PATCH",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
      updatePassword: builder.mutation<
        void,
        Partial<TUpdatePasswordUserSchema>
      >({
        query: (user) => {
          return {
            url: "/user/updatePassword",
            method: "PATCH",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
      updateRoleUser: builder.mutation<TRoleUser, Partial<TRoleUser>>({
        query: (user) => {
          return {
            url: `/updateRole`,
            method: "PUT",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useUserQuery,
  useUserByIdQuery,
  useGetUserQuery,
  useResetPasswordUserMutation,
  useUpdateBlockUserMutation,
  useUpdateRoleUserMutation,
  useUpdatePasswordMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi;
