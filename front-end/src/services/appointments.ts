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
      getAllappointmentData: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: "/getAllAppointmentData",
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

export const { useGetAllappointmentDataQuery, useAddAppointmentMutation } =
  appointmentApi;
export const appointmentReducer = appointmentApi.reducer;
export default appointmentApi;
