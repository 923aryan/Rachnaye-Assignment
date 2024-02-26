import { InputAdornment, TextField } from "@material-ui/core";
import SearchBarIcon from "../utils/searchBarIcon";
import React, { useEffect, useRef, useState } from "react";
import { getProductBySearch } from "../api/requests";
import SearchIcon from '@material-ui/icons/Search';
import '../index.css'
// interface Category {
//     data: string[] | null;
// }

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
interface Category {
    products: Product[];
}

interface SingleProduct {
    onProductSelected: (productId: number) => void
}
export const SearchBar: React.FC<SingleProduct> = ({ onProductSelected }) => {

    const searchBarRef = useRef<HTMLDivElement | null>(null)
    const [inputProdcut, setInputProduct] = useState('')
    const [receivedProdcut, setReceivedProduct] = useState<Category | null>(null)
    const handleDocumentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
        const divElement = searchBarRef.current;
        console.log("yes clicked")
        if (divElement instanceof HTMLDivElement && !divElement.contains((event as React.MouseEvent).target as Node)) {
            console.log("Clicked outside");
            setReceivedProduct(null);
            setInputProduct('');
        }
    };



    const getSearchedProducts = () => {
        getProductBySearch(inputProdcut)
            .then((response: Category) => {
                console.log('Searched PRoduct:', response.products);
                setReceivedProduct(response)
                console.log("smm", receivedProdcut)
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick as (event: MouseEvent) => void);

        return () => {
            document.removeEventListener('click', handleDocumentClick as (event: MouseEvent) => void);
        };
    }, []);

    useEffect(() => {

        inputProdcut.length > 0 && getSearchedProducts();
    },
        [inputProdcut]);
    return (
        <>
            <div className="bg-white rounded-[5px] w-[70%] relative flex flex-col">

                <TextField fullWidth value={inputProdcut}
                    InputProps={{
                        style: {
                            padding: '10px',
                            textAlign: 'start',
                            width: "100%",
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchBarIcon />
                            </InputAdornment>
                        ),

                        disableUnderline: true,
                        placeholder: "Use 5+ words to describe your design",

                    }}

                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setInputProduct(event.target.value); console.log("thevalue ", event.target.value) }}
                >
                </TextField>

                {receivedProdcut && <div ref={searchBarRef} className="z-50 mt-2 bg-white w-[100%] rounded-[5px] flex flex-col max-h-60 overflow-auto no-scrollbar pl-4 pr-4 absolute pd-6 pt-4"     style={{ top: '100%' }} >

                    <div className="gap-y-10">

                        {receivedProdcut?.products.map((item: Product, index: number) => (
                            <div key={index} className="text flex flex-row justify-start cursor-pointer mb-4" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { onProductSelected(item.id); setInputProduct(''); setReceivedProduct(null) }}>
                                <SearchIcon className="mr-2"></SearchIcon>
                                {item.title}
                            </div>
                        ))}

                    </div>
            
                </div> 

                        }
            </div >

        </>

    )

}
