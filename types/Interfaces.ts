export interface User {
  idUser: number;
  firstName: string;
  lastName: string;
  shippingAddress: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface Product {
  idProduct: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
}

export interface Order {
  idOrder: number;
  idUser: number;
  orderNumber: string;
  orderStatus: string;
  shippingAddress: string;
  createdAt: string; // fecha ISO
}

export interface OrderItem {
  idOrderItem: number;
  idOrder: number;
  idProduct: number;
  quantity: number;
  price: number;
}

export interface CartProduct {
  idUser: number;
  idProduct: number;
  quantity: number;
}
