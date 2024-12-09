export type warehousePayLoad = {
  warehouseId: string;
  warehouseName: string;
  contactPerson: string;
  phone: string;
  location: string;
  employees: string;
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
