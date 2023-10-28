import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAppointment } from "../schema/appointments";

const appointmentApi = createApi({
  reducerPath: "appointment",
  tagTypes: ["Appointment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      appointment: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: "/appointment",
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      addAppointment: builder.mutation<TAppointment, Partial<TAppointment>>({
        query: (appointments) => {
          return {
            url: "/appointment",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
    };
  },
});

export const { useAppointmentQuery, useAddAppointmentMutation } =
  appointmentApi;
export const appointmentReducer = appointmentApi.reducer;
export default appointmentApi;
