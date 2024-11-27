export type Filter = {
  field: string;
  type: TextFilter | SelectFilter | DateFilter;
};

export type TextFilter = {
  value: string;
  category: string;
};

