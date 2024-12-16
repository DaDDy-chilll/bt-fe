export type Invoice = {
  invoice_no: string;
  order_no: string;
  product: number;
  order_status: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
};


export type ManageInvoice = {
  search: string;
  order_status: string;
  state: string;
  city: string;
};

  export type InvoiceSetting = {
    shopname: string;
    phone: string[];
    address: string;
    note: string[];
    background_image: string;
    logo_image: string;
    qr_code: string;
    signature: string;
    theme: string;
    test_style: string;
  };
    