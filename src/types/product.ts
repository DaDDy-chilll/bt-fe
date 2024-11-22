export type Gem = {
  id: number;
  type: string;
  color: string;
  mass: number;
  massUnit: string;
  pieces: number;
  price: number;
};

export type Product = {
  id: number;
  images: string[];
  productCategory: {
    id: number;
    category: string;
  };
  productType: {
    id: number;
    type: string;
  };
  productName: string;
  productLength: {
    length: number;
    unit: string;
  };
  productWeight: {
    weight: number;
    unit: string;
  };
  goldType: {
    id: number;
    type: string;
  };
  goldColor: {
    id: number;
    color: string;
  };
  goldSize: {
    size: number;
    unit: string;
  };
  goldWeight: {
    weight: number;
    unit: string;
  };
  kyatt: number;
  pe: number;
  yaway: number;
  chan: number;
  gm: number;
  kyatt2: number;
  pe2: number;
  yaway2: number;
  chan2: number;
  latkha: number;
  gems: Gem[];
  memo: string;
};
