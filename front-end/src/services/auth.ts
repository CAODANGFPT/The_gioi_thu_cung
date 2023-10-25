import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRegisterAccount } from "../schema/registerAccount";

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
    };
  },
});

export const {
  useRegisterUserMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
