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
      paymentStatus: "",
      paymentMethod: "",
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
      estimated_duration: "",
      shipping_fee: "",
      memo: "",
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
      paymentStatus:string,
      paymentMethod:string,
    }){
      Object.assign(this.orderDetails,details);
    },
    addShipping(shipping: any) {
      this.shipping = shipping;
    },
  },
});
