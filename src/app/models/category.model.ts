export interface technology {
  ID: number;
  Type: string;
}

export interface categoryList {
  CategoryID: number;
  CategoryName: string;
}

export interface category {
  CategoryID: number;
  CategoryName: string;
  CategoryDescription: string;
  Image: string;
  Material: categoryList[];
  Technology: technology[];
  Height: categoryList[];
  Quality: categoryList[];
  Weight: categoryList[];
}
