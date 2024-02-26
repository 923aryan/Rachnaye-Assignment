import './index.css'
import { useEffect, useState } from "react"
import { getCategories } from "./api/requests";
import Categories from "./components/categories";
import { Link, useNavigate } from "react-router-dom";
import ProductPage from "../products";
import ShowAllCategories from "../products/components/AllCategories";
import { SearchBar } from "./components/TextField";

interface Category {
    data: string[];
}


function SearchPage() {

    const [categories, setCategories] = useState<Category>({ data: [] });
    const [category, setCategory] = useState<string | null>(null)
    const [showAllCategory, setShowAllCategory] = useState<boolean | null>(false)
    const [remainingCategory, setRemainingCategory] = useState<string[]>([])
    const [productId, setProdcutId] = useState<number | null>(null)
    const getData = () => {
        getCategories()
            .then((response: Category) => {
                console.log('Categories:', response.data);
                setCategories(response);
                setCategory(response.data[0])
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="bg-gradient-to-r from-teal-500 to-purple-600 min-h-[35vh] rounded-[8px] w-full flex flex-col justify-between items-center p-5 space-y-4">
                <h2 className="text-white text-4xl">What will you design today? </h2>
                <SearchBar onProductSelected={(productId: number) => { setShowAllCategory(false); setCategory(null); setProdcutId(productId); console.log("pname", productId, category, showAllCategory) }
                } ></SearchBar>
                {categories.data.length > 0 ? (
                    <Categories
                        categories={categories.data}
                        onCategorySelected={(categoryData: string) => {
                            setCategory(categoryData);
                            setProdcutId(null)
                            setShowAllCategory(false)
                            console.log(categoryData);
                        }}
                        optedForAllCategories={(remainingCategories: string[]) => {
                            setShowAllCategory(true);
                            setProdcutId(null)
                            setRemainingCategory(remainingCategories);
                        }}
                    />
                ) : (
                    <p>No categories available.</p>
                )}

            </div>

            <div className="flex flex-col mt-2">
                <Link to={"products"}>
                    <div className="flex flex-row justify-end font-semibold mr-2 color hover:text-sky-400 hover:cursor-pointer transition-all duration-300"
                    >See All</div>

                </Link>

                {category !== null && !showAllCategory ? (
                    <div>
                        <ProductPage categoryName={category} />
                    </div>
                ) : productId !== null && !showAllCategory ? (
                    <div>
                        <ProductPage productId={productId} />
                    </div>
                ) : null}


                {
                    showAllCategory && <ShowAllCategories categories={remainingCategory}
                        onCategorySelected={(categoryData: string) => {
                            setCategory(categoryData);
                            setShowAllCategory(false)
                        }}></ShowAllCategories>
                }
            </div>


        </>
    );
}

export default SearchPage;
