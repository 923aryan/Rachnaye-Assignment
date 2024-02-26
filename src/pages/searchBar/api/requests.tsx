import axios from "axios"

interface CategoryData {
    data: string[];
  }
  
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface Products {
  products: Product[];
}
  
// All the endpoints related to search and categories
  export const getCategories = (): Promise<CategoryData> => {
    return new Promise<CategoryData>(async (resolve, reject) => {
      try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const getProductBySearch = (product: string): Promise<Products> => {
    return new Promise<Products>(async (resolve, reject) => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${product}`);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const getPaginatedProducts = (skip: number, limit: number): Promise<Products> => {
    return new Promise<Products>(async (resolve, reject) => {
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        resolve(response.data); 
      } catch (error) {
        reject(error);
      }
    });
  };
  