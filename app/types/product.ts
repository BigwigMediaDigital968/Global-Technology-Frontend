export interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  shortDescription?: string;
  longDescription?: string;
  file?: string;

  collectionName?: {
    _id: string;
    name: string;
  };
}
