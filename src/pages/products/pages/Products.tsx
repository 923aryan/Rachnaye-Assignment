import { useEffect, useState } from "react";
import { getPaginatedProducts } from "../../searchBar/api/requests";
import ProductCard from "../components/Card";
import { makeStyles } from "@material-ui/core";

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
  const [leftProducts, setLeftProducts] = useState<Product[]>([]);
  const [rightProducts, setRightProducts] = useState<Product[]>([]);

  const loadMoreProducts = async () => {
    try {
      const limit = 10; // Load 10 products at a time
      const skip = (page - 1) * limit;

      const result = await getPaginatedProducts(skip, limit);

      // Split new products into left and right arrays
      const newLeftProducts = result.products.slice(0, result.products.length / 2);
      const newRightProducts = result.products.slice(result.products.length / 2);

      setLeftProducts((prevLeftProducts) => [...prevLeftProducts, ...newLeftProducts]);
      setRightProducts((prevRightProducts) => [...prevRightProducts, ...newRightProducts]);

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      // Loading 10 products initially (5 on left and 5 on right)
      const initialLimit = 10;
      const initialResult = await getPaginatedProducts(0, initialLimit);

      setLeftProducts(initialResult.products.slice(0, initialResult.products.length / 2));
      setRightProducts(initialResult.products.slice(initialResult.products.length / 2));

      setPage(2);
    };

    initialLoad();
  }, []);

  console.log("left", leftProducts);
  console.log("right", rightProducts);

  return (
    <div className="flex flex-col bg-neutral-700 rounded-md h-[100%] w-[100%]">
      <div className="flex flex-row justify-center text-cyan-500 font-bold text-2xl">ALL PRODUCTS</div>

      <div className="flex text-white">
        <div className="w-1/2 p-4">
          {leftProducts.map((product, index) => (
            <div key={product.id.toString() + product.title} className="mb-2 flex flex-row justify-center">
              <ProductCard product={product} classes={classes} />
            </div>
          ))}
        </div>
        <div className="w-1/2 p-4">
          {rightProducts.map((product, index) => (
            <div key={product.id} className="mb-2 flex flex-row justify-center">
              <ProductCard product={product} classes={classes} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-row justify-center text-xl font-semibold mr-2 color hover:text-sky-400 text-white hover:cursor-pointer transition-all duration-300"
        onClick={loadMoreProducts}
      >
        Load More
      </div>
    </div>
  );
};

export default AllProduct;





