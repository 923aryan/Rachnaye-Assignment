import { useEffect, useState } from "react";
import { getPaginatedProducts } from "../../searchBar/api/requests";
import ProductCard from "../components/Card";
import { makeStyles } from "@material-ui/core";
import '../index.css'
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
const useStyles = makeStyles({
    root: {
        minWidth: "30%",
        maxWidth: "30%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

//Component for showing all products in the paginated way in which 
//10 items are loaded on every next load
const AllProduct: React.FC = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
  
    const loadMoreProducts = async () => {
        try {
          const limit = 10; // Load 5 products at a time
          const skip = (page - 1) * limit;
    
          const result = await getPaginatedProducts(skip, limit);
          console.log("added", result.products);
          setProducts((prevProducts) => [...prevProducts, ...result.products]);
    
          setPage((prevPage) => prevPage + 1);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
    useEffect(() => {
      const initialLoad = async () => {
        // Load 10 products initially (5 on left and 5 on right)
        const initialLimit = 10;
        const initialResult = await getPaginatedProducts(0, initialLimit);
        setProducts(initialResult.products);
        setPage(2);
      };
  
      initialLoad();
    }, []);
  
    const leftProducts = products.slice(0, products.length / 2);
    const rightProducts = products.slice(products.length / 2);
  
    console.log("left", leftProducts);
    console.log("right", rightProducts);
  
    return (
      <div className="flex flex-col bg-neutral-700 rounded-md h-[100%] w-[100%]">
        <div className="flex flex-row justify-center text-cyan-500 font-bold text-2xl">ALL PRODUCTS</div>
  
        <div className="flex">
          <div className="w-1/2 p-4 text-white">
            {leftProducts.map((product, index) => (
              <div key={product.id.toString() + product.title} className="mb-2 flex flex-row justify-center">
                <ProductCard product={product} classes={classes} />
              </div>
            ))}
          </div>
          <div className="w-1/2 p-4 text-white mb-4">
            {rightProducts.map((product, index) => (
              <div key={product.id} className="mb-2 flex flex-row justify-center">
                <ProductCard product={product} classes={classes} />
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex flex-row justify-center text-xl font-semibold mr-2 color hover:text-sky-400 hover:cursor-pointer transition-all duration-300"
          onClick={loadMoreProducts}
        >
          Load More
        </div>
      </div>
    );
  };
  
  export default AllProduct;
  
  
  

