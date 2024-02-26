import React, { useState } from "react";
import { iconsArray } from "../helpers/icons";
import '../index.css'
import ShowAllCategories from "../../products/components/AllCategories";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
interface CategoriesProps {
    categories: string[];
    onCategorySelected: (category: string) => void
    optedForAllCategories: (category: string[]) => void
}


const Categories: React.FC<CategoriesProps> = ({ categories, onCategorySelected, optedForAllCategories }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedCategories = showAll ? categories : categories.slice(0, 5);
    const remainingCategories = categories.slice(5, categories.length + 1);
    console.log(remainingCategories)
    return (

        <div className="flex flex-row justify-around items-center space-x-4 relative" >
            {displayedCategories.map((category, index) => (

                <div key={index} className="flex flex-col items-center cursor-pointer" >

                    <div onClick={() => onCategorySelected(category)} className="shadow-xl hover:bg-sky-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-16 h-16 bg-white rounded-full overflow-hidden p-4"
                    >
                        <img className="object-cover" src={iconsArray[index]} />
                    </div>

                    <div className="text-white font-semibold mt-2 overflow-ellipsis" >{category}</div>
                </div>

            ))}
            {!showAll && categories.length > 5 && (
                <div className="flex flex-col items-center cursor-pointer">
                    <div onClick={() => optedForAllCategories(remainingCategories)} className="shadow-xl hover:bg-sky-700 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-16 h-16 bg-white rounded-full overflow-hidden p-4 flex justify-center items-center">

                        <MoreHorizIcon></MoreHorizIcon>

                    </div>
                    <div className="text-white font-semibold mt-2 overflow-ellipsis" >See All</div>
                </div>


            )}


        </div>
    );
};



export default Categories;
