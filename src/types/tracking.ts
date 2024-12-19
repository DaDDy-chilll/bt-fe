import type { Product } from "./product";

export interface Tracking {
    id: string;
    customer: string;
    phone: string;
    quantity: number;
    staff: string;
    shipping: string;
    date: string;
    price: string;
    status: string;
    products: Product[];
    image: string;
    name: string;
}

export interface Pending {
    orders: Tracking[];
}

export interface PaymentProcess {
    orders: PaymentProcess[];
}