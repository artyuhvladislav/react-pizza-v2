import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartItemSelector } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  types: number[];
  rating: number;
  sizes: number[];
};

const pizzaTypes = ['thin', 'thick'];

export const PizzaBlock = ({
  id,
  rating,
  imageUrl,
  title,
  types,
  sizes,
  price,
}: PizzaBlockProps) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const cartItem = useSelector(cartItemSelector(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      rating,
      imageUrl,
      title,
      price,
      type: pizzaTypes[activeType],
      size: activeSize,
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`items/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                className={typeId === activeType ? 'active' : ''}
                key={typeId}
                onClick={() => setActiveType(typeId)}>
                {pizzaTypes[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                className={i === activeSize ? 'active' : ''}
                key={i}
                onClick={() => setActiveSize(i)}>
                {size} сm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {price} $</div>
          <div className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
