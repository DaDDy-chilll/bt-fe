import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: [],
    customer: null,
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
    }
  },
});
