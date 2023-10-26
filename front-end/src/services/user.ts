import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser } from "../schema/user";

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
    };
  },
});

export const { useUserQuery } = userApi;
export const userReducer = userApi.reducer;
export default userApi;
