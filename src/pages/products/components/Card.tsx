import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import '../index.css'
interface ProductCardProps {
  product: {
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
  };
  classes: Record<string, string>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, classes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 1000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, [product.images]);
  return (
    <div className='maincontainer flex flex-col justify-center'>
      <div className='thecard'>
        <div className='thefront'>
          <Card style={{
            borderRadius: "10px",
            border: 'none',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(25, 255, 255, 0.1)',
            height: '250px',
            position: 'relative',
          }} variant="outlined">
            {product.images.length > 0 && (
              <img
                src={product.images[currentImageIndex]}
                alt="Product Thumbnail"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  zIndex: 2, 
                }}
              />
            )}
            <CardContent style={{
              background: 'rgba(255, 255, 255, 0)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              position: 'relative',
              zIndex: 1,
            }}>
            </CardContent>
          </Card>

        </div>
        <div className='theback'>
          <Card style={{
            borderRadius: "10px",
            border: 'none',
            backdropFilter: 'blur(10px)',
            height: '250px',
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0,1)',
            color: "white"
          }} variant="outlined">

              <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              position: 'relative',
              zIndex: 1,
            }}>
                <Typography variant="body2" component="p" style={{fontWeight : "bold"}}>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight : "bold"}}>
                  Discount Percentage: {product.discountPercentage}%
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight : "bold"}}>
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight : "bold"}}>
                  Stock: {product.stock}
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight : "bold"}}>
                  Brand: {product.brand}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
        </div>
      </div>
      <div className='font-semibold flex flex-row justify-center'>{product.title}</div>
    </div>

  );
};

export default ProductCard;
