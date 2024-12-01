export type warehousePayLoad = {
  warehouseId: number | string;
  warehouseName: string;
  contactPerson: string;
  phone: string;
  location: string;
  employees: number;
  warehouseType: string;
};

export type transferProduct = {
  id: number;
  product_name: string;
  product_id: string;
  type: string;
  category: string;
  quantity: number;
  attributes: {
    diamond: boolean;
    ruby: boolean;
  };
  carat: string;
  price: number;
  image: string;
};
