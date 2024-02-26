import axios from "axios";

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
// All the endpoints related to products are defind here
export const getProducts = async(category: string): Promise<Products> => {
    console.log(category)
  return new Promise<Products>(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};


export const getProduct = async (id: number): Promise<Products> => {
  return new Promise<Products>(async (resolve, reject) => {
    try {
      console.log("o", id);
      const response = await axios.get(`https://dummyjson.com/products/${id}`);

    
      const productsInstance: Products = {
        products: [response.data]
      };

      console.log("mrea", productsInstance);

      resolve(productsInstance);
    } catch (error) {
      reject(error);
    }
  });
};
