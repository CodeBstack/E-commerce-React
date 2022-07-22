import { useContext } from 'react';
import CategoryPreview from '../../component/category-preview/category-preview.component';

import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  // console.log(Object.keys(categoriesMap), categoriesMap[title]);
  return (
    <>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];
        // console.log(categoriesMap[title]);
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
