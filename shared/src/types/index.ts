export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  }
  
  export interface Event {
    id: number;
    name: string;
    date: Date;
    time: Date;
    venue: string;
    city: string;
    totalCapacity: number;
    basePrice: number;
    gstAmount: number;
    totalPrice: number;
  }
  
  export interface Ticket {
    id: number;
    eventId: number;
    sellerId: number;
    buyerId?: number;
    price: number;
    status: 'AVAILABLE' | 'SOLD' | 'CANCELLED';
  }
  
  export interface Payment {
    id: number;
    ticketId: number;
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
  }