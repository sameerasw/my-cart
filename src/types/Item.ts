export interface EventItem {
    id: number;
    productName	: string;
    productLocation: string;
    productDate: string;
    productTime: string;
    productId: number;
    productPrice: number;
    details: string;
    image: string;
    vendorName: string;
    vendorId: number;
    availableProducts: number;
    avgRating: number;
  }
  
  export interface TicketDTO {
    productName	: string;
    imageUrl: string;
    dateTime: string;
    productId: string;
  }
  
  export interface TicketPoolDTO {
    id: number;
    maxPoolSize: number;
    availableProducts: number;
    productId: number;
  }