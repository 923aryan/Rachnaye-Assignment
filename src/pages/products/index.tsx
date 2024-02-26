import React, { useEffect, useRef, useState } from 'react';
import { getProduct, getProducts } from './api/requests';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ProductCard from './components/Card';

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

interface CategoryNameProps {
    categoryName?: string | null;
    productId?: number | null;
}

//This Component shows all the products in the cateogry below the SearchBar and Category
const ProductPage: React.FC<CategoryNameProps> = ({ categoryName, productId  }) => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleNextClick = () => {
        containerRef.current?.scrollBy({ behavior: 'smooth', left: 500 });
    };

    const handlePreviousClick = () => {
        containerRef.current?.scrollTo({ behavior: 'smooth', left: -500 });
    };


    const classes = useStyles();
    const [products, setProducts] = useState<Products | null>(null);
    const getData = () => {
        if(categoryName)
        {
            console.log("cateogry ka call hua")
            getProducts(categoryName)
            .then((response: Products) => {
                console.log('Products in ui:', response);
                setProducts(response);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
        }
        else if(productId){
            console.log("productname ka call hua")

            getProduct(productId)
            .then((response: Products) => {
                console.log('Products in ui:', response);
                setProducts(response);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
        }

    };

    useEffect(() => {
        getData();
        containerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [categoryName, productId]);
    return (
        <div className='px-[5%] flex w-full flex-row justify-start gap-10 mt-4 overflow-hidden' ref={containerRef}>
            {products && products.products.map((product, index) => (    
                    <ProductCard key={index} product={product} classes={classes} />
        
            ))}
            <div className='fixed top-1/2 transform -translate-y-1/2 right-4 mt-4'>
                <div onClick={handleNextClick} className='flex flex-col justify-center items-center z-10 h-12 w-12 bg-white rounded-full border border-gray-200 hover:bg-slate-200 duration-300 ease-in-out'>

                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </div>
            </div>
            <div className='fixed top-1/2 transform -translate-y-1/2 left-4 mt-4'>
                <div onClick={handlePreviousClick} className='flex flex-col justify-center items-center z-10 h-12 w-12 bg-white rounded-full border border-gray-200 hover:bg-slate-200 duration-300 ease-in-out'>
                    <ArrowBackIosIcon className='ms-2'></ArrowBackIosIcon>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;

