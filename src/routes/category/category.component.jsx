import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../component/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();

  // console.log(category)
  const { categoriesMap } = useContext(CategoriesContext);

  // const products = categoriesMap[category]

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toLocaleUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
