import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser } from "../schema/user";
import { TResetPasswordUserSchema } from "../schema/resetPassword";

const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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
      }),
      resetPasswordUser: builder.mutation<TResetPasswordUserSchema, Partial<TResetPasswordUserSchema>>({
        query: (user) => {
          return {
            url: "/password/reset",
            method: "POST",
            body: user,
          };
        },
      }),
    };
  },
});

export const { useUserQuery , useResetPasswordUserMutation } = userApi;
export const userReducer = userApi.reducer;
export default userApi;
