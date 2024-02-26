import { Card } from "@material-ui/core";
import { iconsArray } from "../../searchBar/helpers/icons";
import { useRef } from "react";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
interface CategoriesProps {
    categories: string[];
    onCategorySelected: (category: string) => void
}
import '../index.css'

//when user presses show all button in categories then all categories are shown below it using this component
const ShowAllCategories: React.FC<CategoriesProps> = ({ categories, onCategorySelected }) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleNextClick = () => {
        containerRef.current?.scrollBy({ behavior: 'smooth', left: 500 });
    };

    const handlePreviousClick = () => {
        containerRef.current?.scrollTo({ behavior: 'smooth', left: -500 });
    };

    return (
        <div className="relative">
            <div className='px-[5%] flex w-full flex-row justify-start gap-10 mt-4 overflow-hidden relative' ref={containerRef}>
                {
                    categories.map((category: string, index: number) => (
                        <div key={category} className='group maincontainer w-[200px] flex flex-col justify-center align-middle cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105' onClick={() => onCategorySelected(category)}>
                            <div >

                                <Card style={{
                                    borderRadius: "10px",
                                    border: 'none',
                                    backdropFilter: 'blur(10px)',
                                    backgroundColor: 'rgba(25, 255, 255, 0.1)',
                                    height: '250px',
                                    position: 'relative',
                                }} variant="outlined">
                                    {categories.length > 0 && (
                                        <img
                                            src={iconsArray[index + 5]}
                                            alt="Product Thumbnail"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                zIndex: 2,
                                            }}
                                        />
                                    )}
                                </Card>

                            </div>
                            <div className='group-hover:text-blue-400 mb-4 font-semibold flex flex-row justify-center'>{categories[index]}</div>
                        </div>

                    ))}
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 right-4'>
                <div onClick={handleNextClick} className='flex flex-col justify-center items-center z-10 h-12 w-12 bg-white rounded-full border border-gray-200 hover:bg-slate-200 duration-300 ease-in-out'>
                    <ArrowForwardIosIcon className='ms-2'></ArrowForwardIosIcon>
                </div>
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 left-4'>
                <div onClick={handlePreviousClick} className='flex flex-col justify-center items-center z-10 h-12 w-12 bg-white rounded-full border border-gray-200 hover:bg-slate-200 duration-300 ease-in-out'>
                    <ArrowBackIosIcon className='ms-2'></ArrowBackIosIcon>
                </div>
            </div>
        </div>


    )
}

export default ShowAllCategories;