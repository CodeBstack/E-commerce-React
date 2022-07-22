import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.contexts';
import Button, { BUTTON_TYPE_CLASS } from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductsToCart = () => addItemToCart(product);
  // console.log(addProductsToCart());

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASS.inverted}
        onClick={addProductsToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
