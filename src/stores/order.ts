import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: [],
    customer: {
      firstname: "",
      lastname: "",
      phone: "",
      nrc: "",
      email: "",
      social_media: "",
    },
    orderDetails: {
      invoiceCode: "",
      todayDate: "",
      staffName: "",
      goldPrice: 0,
      goldMethod: "",
      orderType: "",
      orderPlatform: "",
      productType: "",
      totalQuantity:0,
      totalAmount:0,
    },
    shipping: {
      shipping_method: "",
      country: "",
      prefecture: "",
      address: "",
      address1: "",
      receiver_name: "",
      phone_number: "",
      shipping_company: "",
      estimated_duration: 0,
      shipping_fee: 0,
      memo: "",
    },
    payment: {
      payment_method: "",
      payment_status: "",
      partial_amount: 0,
      date: "",
      tax_amount: 0,
      total_amount: 0,
      payment_image: "",
    },
  }),
  actions: {
    addProduct(products: any) {
      this.products = products;
    },
    addCustomer(customer: any) {
      this.customer = customer;
    },
    addOrderDetails(details:{
      invoiceCode:string,
      todayDate:string,
      staffName:string,
      goldPrice:number,
      goldMethod:string,
      orderType:string,
      orderPlatform:string,
      productType:string,
      totalQuantity:number,
      totalAmount:number,
    }){
      Object.assign(this.orderDetails,details);
    },
    addShipping(shipping: any) {
      this.shipping = shipping;
    },
    addPayment(payment: any) {
      this.payment = payment;
    },
    clearOrder(){
      this.products = [];
      this.customer = {
        firstname: "",
        lastname: "",
        phone: "",
        nrc: "",
        email: "",
        social_media: "",
      };
      this.orderDetails = {
        invoiceCode: "",
        todayDate: "",
        staffName: "",
        goldPrice: 0,
        goldMethod: "",
        orderType: "",
        orderPlatform: "",
        productType: "",
        totalQuantity:0,
        totalAmount:0,
      };
      this.shipping = {
        shipping_method: "",
        country: "",
        prefecture: "",
        address: "",
        address1: "",
        receiver_name: "",
        phone_number: "",
        shipping_company: "",
        estimated_duration: 0,
        shipping_fee: 0,
        memo: "",
      };
      this.payment = {
        payment_method: "",
        payment_status: "",
        partial_amount: 0,
        date: "",
        tax_amount: 0,
        total_amount: 0,
        payment_image: "",
      };
    }
  },
});
