export type Supplier = {
  name: string;
  branch: string;
  contact: string;
  startdate: string;
  email: string;
  phone1: string;
  phone2: string;
  state: string;
  city: string;
  address: string;
  website: string;
  social: string;
  memo: {
    name: string;
    date: string;
    text: string;
  }[];
};

export type Memo = {
  name: string;
  date: string;
  text: string;
};