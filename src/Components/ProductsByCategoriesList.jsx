import React from 'react';
import ProductsByCategory from '../pages/ProductsByCategory';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './ComponentsStyling/ProductsByCategories.css'; 

export const SidebarData = [
    {
      title: "Fragrances",
      src: "/Fragrances.jpeg"
    },
    {
        title: "Furniture",
        src: "/furniture.jpeg"
    },
    {
        title: "Groceries",
        src: "/groceries.jpeg"
    },
    {
        title: "Motorcycle",
        src: "/motorcycle.jpeg"
    },
    {
        title: "Woman-Clothes",
        src: "/woman-clothes.png"
    },
    {
        title: "Man-Clothes",
        src: "/man-Clothes.jpeg"
    },
    {
        title: "Vehicle",
        src: "/vehicle.jpeg"
    },
    {
        title: "Sunglasses",
        src: "sunglasses.jpeg"
    },
    {
        title: "sports-accessories",
        src: "/sports-accessories.jpeg"
    },
    {
        title: "Electronics",
        src: "/electorinc.jpeg"
    },
    {
        title: "Mobile-Accessories",
        src: "/mobile-accessories.jpeg"
    },
    {
        title: "Kitchen-Accessories",
        src: "/kitchen-accessories.jpeg"
    },
    {
        title: "Home-Decoration",
        src: "/Home-Decoration.jpeg"
    },
    {
        title: "Beauty and Skin-Care",
        src: "/beauty.jpeg"
    },
];

function ProductsByCategoriesList() {
    const navigate= useNavigate();

    const chunkSize = 5;
    const chunkedData = [];
    for (let i = 0; i < SidebarData.length; i += chunkSize) {
        chunkedData.push(SidebarData.slice(i, i + chunkSize));
    }

    const handleProductsByCategory = (category) => {
    navigate(`/productsByCategory/${category}`);
    }

    return (
        <div id="categoryCarousel" className="carousel slide" data-bs-ride="false">
            <div className="carousel-inner">
                {chunkedData.map((chunk, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="d-flex justify-content-center">
                            {chunk.map((product, productIndex) => (
                               <div className="category-item" key={productIndex}>
                               <button className="category-button" onClick={() => handleProductsByCategory(product.title)}                               >
                                   <div className="category-image">
                                       <img src={product.src} alt={product.title}/>
                                   </div>
                                   <span>{product.title}</span>
                               </button>
                           </div>                           
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#categoryCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#categoryCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default ProductsByCategoriesList;