export interface EventItem {
    id: number;
    eventName: string;
    eventLocation: string;
    eventDate: string;
    eventTime: string;
    eventId: number;
    ticketPrice: number;
    details: string;
    image: string;
    vendorName: string;
    vendorId: number;
    availableTickets: number;
  }
  
  export interface TicketDTO {
    eventName: string;
    ticketId: string;
    imageUrl: string;
    dateTime: string;
    eventId: string;
  }
  
  export interface TicketPoolDTO {
    id: number;
    maxPoolSize: number;
    availableTickets: number;
    eventItemId: number;
  }