export type Gem = {
  id: number | null;
  type: string | null;
  color: string | null;
  mass: number | null;
  massUnit: string | null;
  pieces: number | null;
  price: number | null;
};

export type Product = {
  id: number | null;
  warehouse: {
    id: number | null;
    name: string | null;
  };
  images: string[];
  productCategory: {
    id: number | null;
    category: string | null;
  };
  productType: {
    id: number | null;
    type: string | null;
  };
  productName: string | null;
  productLength: {
    length: number | null;
    unit: {
      id: number | null;
      symbol: string | null;
    };
  };
  productWeight: {
    weight: number | null;
    unit: {
      id: number | null;
      symbol: string | null;
    };
  };
  goldType: {
    id: number | null;
    type: string | null;
  };
  goldColor: {
    id: number | null;
    color: string | null;
  };
  goldSize: {
    size: number | null;
    unit: {
      id: number | null;
      symbol: string | null;
    };
  };
  goldWeight: {
    weight: number | null;
    unit: {
      id: number | null;
      symbol: string | null;
    };
  };
  kyatt: number | null;
  pe: number | null;
  yaway: number | null;
  chan: number | null;
  gm: number | null;
  kyatt2: number | null;
  pe2: number | null;
  yaway2: number | null;
  chan2: number | null;
  gm2: number | null;
  latkha: number | null;
  gems: Gem[];
  memo: string | null;
};

export type Filter = {
  page: number;
  limit: number;
};

// send data product
export type sendData = {
  id: bigint | null;
  code: string | null;
  category_id: number | null;
  type_id: number | null;
  name: string | null;
  length: number | null;
  length_unit_id: number | null;
  weight: number | null;
  weight_unit_id: number | null;
  gold_types_id: number | null;
  gold_color_id: number | null;
  size: number | null;
  size_unit_id: number | null;
  total_weight: number | null;
  total_weight_unit_id: number | null;
  gems_price: number | null;
  ayoutwat: number | null;
  latt_kha: number | null;
  m_product_gems: sendDataGem[] | null;
  m_photos: sendDataPhoto[] | null;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
  del_flg: boolean;
};

// send data gem
export type sendDataGem = {
  name: string;
  pieces: number;
  color_id: number;
  weight: number;
  weight_unit_id: number;
  icon: string;
};

// send data photo
export type sendDataPhoto = {
  id: bigint;
  code: string;
  photo_path: string;
};

