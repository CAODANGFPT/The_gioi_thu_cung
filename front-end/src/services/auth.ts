import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRegisterAccount } from "../schema/registerAccount";
import { SignInResponse, TSignIn } from "../schema/signIn";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      registerUser: builder.mutation<TRegisterAccount, Partial<TRegisterAccount>>({
        query: (user) => {
          return {
            url: "/register",
            method: "POST",
            body: user,
          };
        },
      }),
      loginUser: builder.mutation<SignInResponse, Partial<TSignIn>>({
        query: (user) => {
          return {
            url: "/login",
            method: "POST",
            body: user,
          };
        },
      }),
    };
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
