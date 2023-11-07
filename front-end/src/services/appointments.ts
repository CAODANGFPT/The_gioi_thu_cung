import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AppointmentResponse,
  TAppointment,
  TAupdateStatusAppointment,
  TCreateAppointment,
} from "../schema/appointments";

const appointmentApi = createApi({
  reducerPath: "appointment",
  tagTypes: ["Appointment"],
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
      getAllappointmentData: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: "/getAllAppointmentData",
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      getAppointmentUser: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: `/getAppointmentUser`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      addAppointment: builder.mutation<
        AppointmentResponse,
        Partial<TCreateAppointment>
      >({
        query: (appointments) => {
          return {
            url: "/appointment",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
      updateStatusAppointment: builder.mutation<
        TAppointment,
        Partial<TAupdateStatusAppointment>
      >({
        query: (appointments) => ({
          url: `/appointmentStatus/${appointments.id}`,
          method: "PATCH",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
    };
  },
});

export const {
  useGetAllappointmentDataQuery,
  useGetAppointmentUserQuery,
  useAddAppointmentMutation,
  useUpdateStatusAppointmentMutation,
} = appointmentApi;
export const appointmentReducer = appointmentApi.reducer;
export default appointmentApi;
