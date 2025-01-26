import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventItem, TicketDTO, TicketPoolDTO } from '../types/Item';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1245' }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<EventItem[], void>({
      query: () => '/events/list',
    }),
    getEventById: builder.query<EventItem, number>({
      query: (eventId) => `/events/${eventId}`,
    }),
    getVendorEvents: builder.query<EventItem[], number>({
      query: (vendorId) => `/events/${vendorId}/list`,
    }),
    createEvent: builder.mutation<EventItem, Partial<EventItem>>({
      query: (newEvent) => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
    }),
    getTicketsByEventId: builder.query<TicketDTO[], number>({
      query: (eventId) => `/tickets/events/${eventId}`,
    }),
    getAllTickets: builder.query<TicketDTO[], void>({
      query: () => '/tickets/list',
    }),
    getTicketPoolByEventItemId: builder.query<TicketPoolDTO, number>({
      query: (eventItemId) => `/ticketpools/${eventItemId}`,
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetVendorEventsQuery,
  useCreateEventMutation,
  useGetTicketsByEventIdQuery,
  useGetAllTicketsQuery,
  useGetTicketPoolByEventItemIdQuery,
} = itemApi;